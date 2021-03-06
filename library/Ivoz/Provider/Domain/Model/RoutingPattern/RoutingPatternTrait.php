<?php

namespace Ivoz\Provider\Domain\Model\RoutingPattern;

use Ivoz\Core\Application\DataTransferObjectInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;

/**
 * RoutingPatternTrait
 * @codeCoverageIgnore
 */
trait RoutingPatternTrait
{
    /**
     * @var integer
     */
    protected $id;

    /**
     * @var Collection
     */
    protected $lcrRules;


    /**
     * Constructor
     */
    protected function __construct()
    {
        parent::__construct(...func_get_args());
        $this->lcrRules = new ArrayCollection();
    }

    /**
     * Factory method
     * @param DataTransferObjectInterface $dto
     * @return self
     */
    public static function fromDto(DataTransferObjectInterface $dto)
    {
        /**
         * @var $dto RoutingPatternDto
         */
        $self = parent::fromDto($dto);
        if ($dto->getLcrRules()) {
            $self->replaceLcrRules($dto->getLcrRules());
        }
        if ($dto->getId()) {
            $self->id = $dto->getId();
            $self->initChangelog();
        }

        return $self;
    }

    /**
     * @param DataTransferObjectInterface $dto
     * @return self
     */
    public function updateFromDto(DataTransferObjectInterface $dto)
    {
        /**
         * @var $dto RoutingPatternDto
         */
        parent::updateFromDto($dto);
        if ($dto->getLcrRules()) {
            $this->replaceLcrRules($dto->getLcrRules());
        }
        return $this;
    }

    /**
     * @param int $depth
     * @return RoutingPatternDto
     */
    public function toDto($depth = 0)
    {
        $dto = parent::toDto($depth);
        return $dto
            ->setId($this->getId());
    }

    /**
     * @return array
     */
    protected function __toArray()
    {
        return parent::__toArray() + [
            'id' => self::getId()
        ];
    }


    /**
     * Add lcrRule
     *
     * @param \Ivoz\Provider\Domain\Model\LcrRule\LcrRuleInterface $lcrRule
     *
     * @return RoutingPatternTrait
     */
    public function addLcrRule(\Ivoz\Provider\Domain\Model\LcrRule\LcrRuleInterface $lcrRule)
    {
        $this->lcrRules->add($lcrRule);

        return $this;
    }

    /**
     * Remove lcrRule
     *
     * @param \Ivoz\Provider\Domain\Model\LcrRule\LcrRuleInterface $lcrRule
     */
    public function removeLcrRule(\Ivoz\Provider\Domain\Model\LcrRule\LcrRuleInterface $lcrRule)
    {
        $this->lcrRules->removeElement($lcrRule);
    }

    /**
     * Replace lcrRules
     *
     * @param \Ivoz\Provider\Domain\Model\LcrRule\LcrRuleInterface[] $lcrRules
     * @return self
     */
    public function replaceLcrRules(Collection $lcrRules)
    {
        $updatedEntities = [];
        $fallBackId = -1;
        foreach ($lcrRules as $entity) {
            $index = $entity->getId() ? $entity->getId() : $fallBackId--;
            $updatedEntities[$index] = $entity;
            $entity->setRoutingPattern($this);
        }
        $updatedEntityKeys = array_keys($updatedEntities);

        foreach ($this->lcrRules as $key => $entity) {
            $identity = $entity->getId();
            if (in_array($identity, $updatedEntityKeys)) {
                $this->lcrRules->set($key, $updatedEntities[$identity]);
            } else {
                $this->lcrRules->remove($key);
            }
            unset($updatedEntities[$identity]);
        }

        foreach ($updatedEntities as $entity) {
            $this->addLcrRule($entity);
        }

        return $this;
    }

    /**
     * Get lcrRules
     *
     * @return \Ivoz\Provider\Domain\Model\LcrRule\LcrRuleInterface[]
     */
    public function getLcrRules(Criteria $criteria = null)
    {
        if (!is_null($criteria)) {
            return $this->lcrRules->matching($criteria)->toArray();
        }

        return $this->lcrRules->toArray();
    }


}

