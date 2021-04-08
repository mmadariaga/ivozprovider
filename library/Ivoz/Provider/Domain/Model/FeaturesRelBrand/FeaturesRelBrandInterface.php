<?php

namespace Ivoz\Provider\Domain\Model\FeaturesRelBrand;

use Ivoz\Core\Domain\Model\LoggableEntityInterface;
use Ivoz\Provider\Domain\Model\Brand\BrandInterface;
use Ivoz\Provider\Domain\Model\Feature\FeatureInterface;

/**
* FeaturesRelBrandInterface
*/
interface FeaturesRelBrandInterface extends LoggableEntityInterface
{
    /**
     * @codeCoverageIgnore
     * @return array
     */
    public function getChangeSet();

    public function setBrand(?BrandInterface $brand = null): static;

    public function getBrand(): ?BrandInterface;

    public function getFeature(): FeatureInterface;

    /**
     * @return bool
     */
    public function isInitialized(): bool;
}
