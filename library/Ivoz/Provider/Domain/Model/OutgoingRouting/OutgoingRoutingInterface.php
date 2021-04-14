<?php

namespace Ivoz\Provider\Domain\Model\OutgoingRouting;

use Ivoz\Core\Domain\Model\LoggableEntityInterface;
use Ivoz\Provider\Domain\Model\RoutingPattern\RoutingPatternInterface;
use Ivoz\Provider\Domain\Model\Brand\BrandInterface;
use Ivoz\Provider\Domain\Model\Company\CompanyInterface;
use Ivoz\Provider\Domain\Model\Carrier\CarrierInterface;
use Ivoz\Provider\Domain\Model\RoutingPatternGroup\RoutingPatternGroupInterface;
use Ivoz\Provider\Domain\Model\RoutingTag\RoutingTagInterface;
use Ivoz\Provider\Domain\Model\Country\CountryInterface;
use Ivoz\Cgr\Domain\Model\TpLcrRule\TpLcrRuleInterface;
use Ivoz\Kam\Domain\Model\TrunksLcrRule\TrunksLcrRuleInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
use Ivoz\Kam\Domain\Model\TrunksLcrRuleTarget\TrunksLcrRuleTargetInterface;
use Ivoz\Provider\Domain\Model\OutgoingRoutingRelCarrier\OutgoingRoutingRelCarrierInterface;

/**
* OutgoingRoutingInterface
*/
interface OutgoingRoutingInterface extends LoggableEntityInterface
{
    const ROUTINGMODE_STATIC = 'static';

    const ROUTINGMODE_LCR = 'lcr';

    const ROUTINGMODE_BLOCK = 'block';

    /**
     * @codeCoverageIgnore
     * @return array
     */
    public function getChangeSet();

    /**
     * @todo awkward return type
     * @return array of \Ivoz\Provider\Domain\Model\RoutingPattern\RoutingPatternInterface or null
     */
    public function getRoutingPatterns();

    /**
     * Return CGRates tag for LCR category
     *
     * @return string
     */
    public function getCgrCategory();

    /**
     * Return CGRates tag for LCR rating plan category
     *
     * @return string
     */
    public function getCgrRpCategory();

    /**
     * @param \Ivoz\Provider\Domain\Model\RoutingPattern\RoutingPatternInterface $pattern
     * @return bool
     */
    public function hasRoutingPattern(RoutingPatternInterface $pattern);

    public function getType(): ?string;

    public function getPriority(): int;

    public function getWeight(): int;

    public function getRoutingMode(): ?string;

    public function getPrefix(): ?string;

    public function getStopper(): bool;

    public function getForceClid(): ?bool;

    public function getClid(): ?string;

    public function setBrand(BrandInterface $brand): static;

    public function getBrand(): BrandInterface;

    public function getCompany(): ?CompanyInterface;

    public function setCarrier(?CarrierInterface $carrier = null): static;

    public function getCarrier(): ?CarrierInterface;

    public function setRoutingPattern(?RoutingPatternInterface $routingPattern = null): static;

    public function getRoutingPattern(): ?RoutingPatternInterface;

    public function setRoutingPatternGroup(?RoutingPatternGroupInterface $routingPatternGroup = null): static;

    public function getRoutingPatternGroup(): ?RoutingPatternGroupInterface;

    public function setRoutingTag(?RoutingTagInterface $routingTag = null): static;

    public function getRoutingTag(): ?RoutingTagInterface;

    public function getClidCountry(): ?CountryInterface;

    public function isInitialized(): bool;

    public function setTpLcrRule(TpLcrRuleInterface $tpLcrRule): static;

    public function getTpLcrRule(): ?TpLcrRuleInterface;

    public function addLcrRule(TrunksLcrRuleInterface $lcrRule): OutgoingRoutingInterface;

    public function removeLcrRule(TrunksLcrRuleInterface $lcrRule): OutgoingRoutingInterface;

    public function replaceLcrRules(ArrayCollection $lcrRules): OutgoingRoutingInterface;

    public function getLcrRules(?Criteria $criteria = null): array;

    public function addLcrRuleTarget(TrunksLcrRuleTargetInterface $lcrRuleTarget): OutgoingRoutingInterface;

    public function removeLcrRuleTarget(TrunksLcrRuleTargetInterface $lcrRuleTarget): OutgoingRoutingInterface;

    public function replaceLcrRuleTargets(ArrayCollection $lcrRuleTargets): OutgoingRoutingInterface;

    public function getLcrRuleTargets(?Criteria $criteria = null): array;

    public function addRelCarrier(OutgoingRoutingRelCarrierInterface $relCarrier): OutgoingRoutingInterface;

    public function removeRelCarrier(OutgoingRoutingRelCarrierInterface $relCarrier): OutgoingRoutingInterface;

    public function replaceRelCarriers(ArrayCollection $relCarriers): OutgoingRoutingInterface;

    public function getRelCarriers(?Criteria $criteria = null): array;
}
