<?php

namespace Ivoz\Provider\Domain\Model\Brand;

use Ivoz\Core\Domain\Model\TempFileContainnerTrait;
use Ivoz\Core\Domain\Service\FileContainerInterface;
use Ivoz\Provider\Domain\Model\Company\CompanyInterface;

/**
 * Brand
 */
class Brand extends BrandAbstract implements BrandInterface, FileContainerInterface
{
    use BrandTrait;
    use TempFileContainnerTrait;

    /**
     * @codeCoverageIgnore
     * @return array
     */
    public function getChangeSet()
    {
        return parent::getChangeSet();
    }

    /**
     * @return array
     */
    public function getFileObjects()
    {
        return [
            'Logo'
        ];
    }

    /**
     * Get id
     * @codeCoverageIgnore
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @inheritdoc
     */
    public function setDomainUsers($domainUsers = null)
    {
        return parent::setDomainUsers(trim($domainUsers));
    }

    public function getLanguageCode()
    {
        $language = $this->getLanguage();
        if (!$language) {
            return 'en';
        }

        return $language->getIden();
    }

    public function willUseExternallyRating(CompanyInterface $company, $destination=null)
    {
        $outgoingRoutings = $company->getOutgoingRoutings();

        /**
         * @var $outgoingRouting OutgoingRoutingInterface
         */
        foreach ($outgoingRoutings as $outgoingRouting) {
            if (!$outgoingRouting->getPeeringContract()->getExternallyRated()) {
                return false;
            }
        }

        // This call will be rated using externally rater
        return true;
    }

    /**
     * Get the size in bytes used by the recordings on this brand
     *
     */
    public function getRecordingsDiskUsage()
    {
        // Get the sum of all the companies usages
        $total = 0;

        /**
         * @var $company CompanyInterface
         */
        foreach ($this->getCompanies() as $company) {
            $total += $company->getRecordingsDiskUsage();
        }

        return $total;
    }

    /**
     * Get the size in bytes for disk usage limit on this brand
     */
    public function getRecordingsLimit()
    {
        return $this->getRecordingsLimitMB() * 1024 * 1024;
    }

    /**
     * @return FeatureInterface[]
     */
    public function getFeatures()
    {
        $features = array();
        /**
         * @var $relFeature FeaturesRelBrandInterface
         */
        foreach ($this->getRelFeatures() as $relFeature) {
            array_push($features, $relFeature->getFeature());
        }

        return $features;
    }

    /**
     * @param $featureId
     * @return bool
     */
    public function hasFeature($featureId)
    {
        foreach ($this->getFeatures() as $feature) {
            if ($feature->getId() == $featureId) {

                return true;
            }
        }

        return false;
    }
}

