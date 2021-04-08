<?php

namespace Ivoz\Provider\Domain\Model\CompanyRelGeoIPCountry;

use Ivoz\Core\Domain\Model\LoggableEntityInterface;
use Ivoz\Provider\Domain\Model\Company\CompanyInterface;
use Ivoz\Provider\Domain\Model\Country\CountryInterface;

/**
* CompanyRelGeoIPCountryInterface
*/
interface CompanyRelGeoIPCountryInterface extends LoggableEntityInterface
{
    /**
     * @codeCoverageIgnore
     * @return array
     */
    public function getChangeSet();

    public function setCompany(?CompanyInterface $company = null): static;

    public function getCompany(): ?CompanyInterface;

    public function getCountry(): CountryInterface;

    /**
     * @return bool
     */
    public function isInitialized(): bool;
}
