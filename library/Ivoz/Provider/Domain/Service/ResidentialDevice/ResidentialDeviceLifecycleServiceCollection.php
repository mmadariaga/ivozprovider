<?php

namespace Ivoz\Provider\Domain\Service\ResidentialDevice;

use Ivoz\Core\Domain\Assert\Assertion;
use Ivoz\Core\Domain\Service\LifecycleServiceCollectionInterface;
use Ivoz\Core\Domain\Service\LifecycleServiceCollectionTrait;

/**
 * @codeCoverageIgnore
 */
class ResidentialDeviceLifecycleServiceCollection implements LifecycleServiceCollectionInterface
{
    use LifecycleServiceCollectionTrait;

    public static $bindedBaseServices = [
        "pre_persist" =>
        [
            \Ivoz\Provider\Domain\Service\ResidentialDevice\CheckUniqueness::class => 200,
        ],
        "post_persist" =>
        [
            \Ivoz\Ast\Domain\Service\PsEndpoint\UpdateByResidentialDevice::class => 10,
            \Ivoz\Ast\Domain\Service\PsIdentify\UpdateByResidentialDevice::class => 200,
            \Ivoz\Ast\Domain\Service\Voicemail\UpdateByResidentialDevice::class => 200,
        ],
    ];

    protected function addService(string $event, $service): void
    {
        Assertion::isInstanceOf($service, ResidentialDeviceLifecycleEventHandlerInterface::class);
        $this->services[$event][] = $service;
    }
}
