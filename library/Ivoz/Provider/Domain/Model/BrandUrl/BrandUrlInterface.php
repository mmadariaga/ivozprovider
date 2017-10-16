<?php

namespace Ivoz\Provider\Domain\Model\BrandUrl;

use Ivoz\Core\Domain\Model\EntityInterface;

interface BrandUrlInterface extends EntityInterface
{
    /**
     * Set url
     *
     * @param string $url
     *
     * @return self
     */
    public function setUrl($url);

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl();

    /**
     * Set klearTheme
     *
     * @param string $klearTheme
     *
     * @return self
     */
    public function setKlearTheme($klearTheme = null);

    /**
     * Get klearTheme
     *
     * @return string
     */
    public function getKlearTheme();

    /**
     * Set urlType
     *
     * @param string $urlType
     *
     * @return self
     */
    public function setUrlType($urlType);

    /**
     * Get urlType
     *
     * @return string
     */
    public function getUrlType();

    /**
     * Set name
     *
     * @param string $name
     *
     * @return self
     */
    public function setName($name = null);

    /**
     * Get name
     *
     * @return string
     */
    public function getName();

    /**
     * Set userTheme
     *
     * @param string $userTheme
     *
     * @return self
     */
    public function setUserTheme($userTheme = null);

    /**
     * Get userTheme
     *
     * @return string
     */
    public function getUserTheme();

    /**
     * Set brand
     *
     * @param \Ivoz\Provider\Domain\Model\Brand\BrandInterface $brand
     *
     * @return self
     */
    public function setBrand(\Ivoz\Provider\Domain\Model\Brand\BrandInterface $brand = null);

    /**
     * Get brand
     *
     * @return \Ivoz\Provider\Domain\Model\Brand\BrandInterface
     */
    public function getBrand();

    /**
     * Set logo
     *
     * @param Logo $logo
     *
     * @return self
     */
    public function setLogo(\Ivoz\Provider\Domain\Model\BrandUrl\Logo $logo);

    /**
     * Get logo
     *
     * @return Logo
     */
    public function getLogo();

}
