<?php
namespace Ivoz\Provider\Domain\Service\LcrRule;

use Doctrine\Common\Collections\ArrayCollection;
use Ivoz\Core\Domain\Service\EntityPersisterInterface;
use Ivoz\Provider\Domain\Model\LcrRule\LcrRule;
use Ivoz\Provider\Domain\Model\LcrRule\LcrRuleInterface;
use Ivoz\Provider\Domain\Model\OutgoingRouting\OutgoingRoutingInterface;
use Ivoz\Provider\Domain\Model\RoutingPattern\RoutingPatternInterface;
use Ivoz\Provider\Domain\Service\OutgoingRouting\OutgoingRoutingLifecycleEventHandlerInterface;

/**
 * Class UpdateByOutgoingRouting
 * @package Ivoz\Provider\Domain\Service\LcrRule
 */
class UpdateByOutgoingRouting implements OutgoingRoutingLifecycleEventHandlerInterface
{
    /**
     * @var EntityPersisterInterface
     */
    protected $entityPersister;

    public function __construct(
        EntityPersisterInterface $entityPersister
    ) {
        $this->entityPersister = $entityPersister;
    }

    public function execute(OutgoingRoutingInterface $outgoingRouting)
    {
        // If edit, delete everything and fresh-start
        $lcrRules = $outgoingRouting->getLcrRules();
        foreach ($lcrRules as $lcrRule) {
            $this->entityPersister->remove($lcrRule);
            $outgoingRouting->removeLcrRule($lcrRule);
        }

        /**
         * @var LcrRuleInterface[] $lcrRules
         */
        $lcrRules = new ArrayCollection();
        // Create LcrRule for each RoutingPattern
        if ($outgoingRouting->getType() === 'group') {
            $patterns = $outgoingRouting->getRoutingPatternGroup()->getRoutingPatterns();
            foreach ($patterns as $pattern) {
                $lcrRule = $this->addLcrRulePerPattern(
                    $outgoingRouting,
                    $pattern
                );
                $lcrRules->add($lcrRule);
            }
        } elseif ($outgoingRouting->getType() === 'pattern') {
            $lcrRule = $this->addLcrRulePerPattern(
                $outgoingRouting,
                $outgoingRouting->getRoutingPattern()
            );
            $lcrRules->add($lcrRule);
        } elseif ($outgoingRouting->getType() === 'fax') {
            $lcrRule = $this->addLcrRulePerPattern(
                $outgoingRouting
            );
            $lcrRules->add($lcrRule);
        } else {
            throw new \Exception('Incorrect Outgoing Routing Type');
        }

        $outgoingRouting->replaceLcrRules($lcrRules);
    }

    /**
     * @todo this could be a service itself
     * @param OutgoingRoutingInterface $entity
     * @param RoutingPatternInterface|null $pattern
     * @return LcrRuleInterface
     */
    protected function addLcrRulePerPattern(
        OutgoingRoutingInterface $entity,
        RoutingPatternInterface $pattern = null
    ) {
        $lcrRuleDto = LcrRule::createDTO();
        $condition = 'fax';
        if (is_null($pattern)) {
            // Fax route
            $lcrRuleDto
                ->setTag('fax')
                ->setDescription('Special route for fax');
        } else {
            // Non-fax route
            $lcrRuleDto
                ->setTag(
                    $pattern->getName()->getEn()
                )
                ->setDescription(
                    $pattern->getDescription()->getEn()
                )
                ->setRoutingPatternId($pattern->getId());

            $condition = $pattern->getRegExp();
        }

        $lcrRule = LcrRule::fromDTO($lcrRuleDto);
        $lcrRule->setCondition($condition);

        // Setting Outgoing Routing also sets from_uri (see model)
        $lcrRule->setOutgoingRouting($entity);

        $this
            ->entityPersister
            ->persist($lcrRule, true);

        return $lcrRule;
    }

}