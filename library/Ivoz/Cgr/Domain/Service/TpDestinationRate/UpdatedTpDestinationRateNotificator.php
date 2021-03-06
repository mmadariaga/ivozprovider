<?php

namespace Ivoz\Cgr\Domain\Service\TpDestinationRate;

use Ivoz\Cgr\Domain\Model\TpDestinationRate\TpDestinationRateInterface;
use Ivoz\Core\Infrastructure\Domain\Service\Redis\Client as RedisClient;

class UpdatedTpDestinationRateNotificator implements TpDestinationRateLifecycleEventHandlerInterface
{
    private $client;

    public function __construct(RedisClient $client)
    {
        $this->client = $client;
    }

    public function execute(TpDestinationRateInterface $entity)
    {
        $this->client->scheduleFullReload();
    }
}