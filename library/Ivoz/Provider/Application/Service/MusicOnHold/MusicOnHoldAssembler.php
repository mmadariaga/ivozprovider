<?php

namespace Ivoz\Provider\Application\Service\MusicOnHold;

use Ivoz\Core\Application\DataTransferObjectInterface;
use Ivoz\Core\Application\Service\Assembler\CustomEntityAssemblerInterface;
use Ivoz\Core\Application\Service\StoragePathResolverCollection;
use Ivoz\Core\Application\Service\Traits\FileContainerEntityAssemblerTrait;
use Ivoz\Core\Domain\Model\EntityInterface;
use Assert\Assertion;
use Ivoz\Provider\Domain\Model\MusicOnHold\MusicOnHoldInterface;

class MusicOnHoldAssembler implements CustomEntityAssemblerInterface
{
    use FileContainerEntityAssemblerTrait;

    public function __construct(
        StoragePathResolverCollection $storagePathResolver
    ) {
        $this->storagePathResolver = $storagePathResolver;
    }

    public function fromDto(
        DataTransferObjectInterface $musicOnHoldDto,
        EntityInterface $musicOnHold,
        \Ivoz\Core\Application\ForeignKeyTransformerInterface $fkTransformer
    ) {
        Assertion::isInstanceOf($musicOnHold, MusicOnHoldInterface::class);
        $musicOnHold->updateFromDto($musicOnHoldDto, $fkTransformer);
        $this->handleEntityFiles($musicOnHold, $musicOnHoldDto, $fkTransformer);
    }
}
