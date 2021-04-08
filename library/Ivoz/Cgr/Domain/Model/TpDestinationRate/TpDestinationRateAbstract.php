<?php
declare(strict_types = 1);

namespace Ivoz\Cgr\Domain\Model\TpDestinationRate;

use Assert\Assertion;
use Ivoz\Core\Application\DataTransferObjectInterface;
use Ivoz\Core\Domain\Model\ChangelogTrait;
use Ivoz\Core\Domain\Model\EntityInterface;
use \Ivoz\Core\Application\ForeignKeyTransformerInterface;
use Ivoz\Core\Domain\Model\Helper\DateTimeHelper;
use Ivoz\Provider\Domain\Model\DestinationRate\DestinationRate;

/**
* TpDestinationRateAbstract
* @codeCoverageIgnore
*/
abstract class TpDestinationRateAbstract
{
    use ChangelogTrait;

    /**
     * @var string
     */
    protected $tpid = 'ivozprovider';

    /**
     * @var string | null
     */
    protected $tag;

    /**
     * column: destinations_tag
     * @var string | null
     */
    protected $destinationsTag;

    /**
     * column: rates_tag
     * @var string | null
     */
    protected $ratesTag;

    /**
     * column: rounding_method
     * comment: enum:*up|*upmincost
     * @var string
     */
    protected $roundingMethod = '*up';

    /**
     * column: rounding_decimals
     * @var int
     */
    protected $roundingDecimals = 4;

    /**
     * column: max_cost
     * @var float
     */
    protected $maxCost = 0;

    /**
     * column: max_cost_strategy
     * @var string
     */
    protected $maxCostStrategy = '';

    /**
     * column: created_at
     * @var \DateTime
     */
    protected $createdAt;

    /**
     * @var DestinationRate
     * inversedBy tpDestinationRate
     */
    protected $destinationRate;

    /**
     * Constructor
     */
    protected function __construct(
        $tpid,
        $roundingMethod,
        $roundingDecimals,
        $maxCost,
        $maxCostStrategy,
        $createdAt
    ) {
        $this->setTpid($tpid);
        $this->setRoundingMethod($roundingMethod);
        $this->setRoundingDecimals($roundingDecimals);
        $this->setMaxCost($maxCost);
        $this->setMaxCostStrategy($maxCostStrategy);
        $this->setCreatedAt($createdAt);
    }

    abstract public function getId();

    public function __toString()
    {
        return sprintf(
            "%s#%s",
            "TpDestinationRate",
            $this->getId()
        );
    }

    /**
     * @return void
     * @throws \Exception
     */
    protected function sanitizeValues()
    {
    }

    /**
     * @param mixed $id
     * @return TpDestinationRateDto
     */
    public static function createDto($id = null)
    {
        return new TpDestinationRateDto($id);
    }

    /**
     * @internal use EntityTools instead
     * @param TpDestinationRateInterface|null $entity
     * @param int $depth
     * @return TpDestinationRateDto|null
     */
    public static function entityToDto(EntityInterface $entity = null, $depth = 0)
    {
        if (!$entity) {
            return null;
        }

        Assertion::isInstanceOf($entity, TpDestinationRateInterface::class);

        if ($depth < 1) {
            return static::createDto($entity->getId());
        }

        if ($entity instanceof \Doctrine\ORM\Proxy\Proxy && !$entity->__isInitialized()) {
            return static::createDto($entity->getId());
        }

        /** @var TpDestinationRateDto $dto */
        $dto = $entity->toDto($depth-1);

        return $dto;
    }

    /**
     * Factory method
     * @internal use EntityTools instead
     * @param TpDestinationRateDto $dto
     * @return self
     */
    public static function fromDto(
        DataTransferObjectInterface $dto,
        ForeignKeyTransformerInterface $fkTransformer
    ) {
        Assertion::isInstanceOf($dto, TpDestinationRateDto::class);

        $self = new static(
            $dto->getTpid(),
            $dto->getRoundingMethod(),
            $dto->getRoundingDecimals(),
            $dto->getMaxCost(),
            $dto->getMaxCostStrategy(),
            $dto->getCreatedAt()
        );

        $self
            ->setTag($dto->getTag())
            ->setDestinationsTag($dto->getDestinationsTag())
            ->setRatesTag($dto->getRatesTag())
            ->setDestinationRate($fkTransformer->transform($dto->getDestinationRate()));

        $self->initChangelog();

        return $self;
    }

    /**
     * @internal use EntityTools instead
     * @param TpDestinationRateDto $dto
     * @return self
     */
    public function updateFromDto(
        DataTransferObjectInterface $dto,
        ForeignKeyTransformerInterface $fkTransformer
    ) {
        Assertion::isInstanceOf($dto, TpDestinationRateDto::class);

        $this
            ->setTpid($dto->getTpid())
            ->setTag($dto->getTag())
            ->setDestinationsTag($dto->getDestinationsTag())
            ->setRatesTag($dto->getRatesTag())
            ->setRoundingMethod($dto->getRoundingMethod())
            ->setRoundingDecimals($dto->getRoundingDecimals())
            ->setMaxCost($dto->getMaxCost())
            ->setMaxCostStrategy($dto->getMaxCostStrategy())
            ->setCreatedAt($dto->getCreatedAt())
            ->setDestinationRate($fkTransformer->transform($dto->getDestinationRate()));

        return $this;
    }

    /**
     * @internal use EntityTools instead
     * @param int $depth
     * @return TpDestinationRateDto
     */
    public function toDto($depth = 0)
    {
        return self::createDto()
            ->setTpid(self::getTpid())
            ->setTag(self::getTag())
            ->setDestinationsTag(self::getDestinationsTag())
            ->setRatesTag(self::getRatesTag())
            ->setRoundingMethod(self::getRoundingMethod())
            ->setRoundingDecimals(self::getRoundingDecimals())
            ->setMaxCost(self::getMaxCost())
            ->setMaxCostStrategy(self::getMaxCostStrategy())
            ->setCreatedAt(self::getCreatedAt())
            ->setDestinationRate(DestinationRate::entityToDto(self::getDestinationRate(), $depth));
    }

    /**
     * @return array
     */
    protected function __toArray()
    {
        return [
            'tpid' => self::getTpid(),
            'tag' => self::getTag(),
            'destinations_tag' => self::getDestinationsTag(),
            'rates_tag' => self::getRatesTag(),
            'rounding_method' => self::getRoundingMethod(),
            'rounding_decimals' => self::getRoundingDecimals(),
            'max_cost' => self::getMaxCost(),
            'max_cost_strategy' => self::getMaxCostStrategy(),
            'created_at' => self::getCreatedAt(),
            'destinationRateId' => self::getDestinationRate()->getId()
        ];
    }

    protected function setTpid(string $tpid): static
    {
        Assertion::maxLength($tpid, 64, 'tpid value "%s" is too long, it should have no more than %d characters, but has %d characters.');

        $this->tpid = $tpid;

        return $this;
    }

    public function getTpid(): string
    {
        return $this->tpid;
    }

    protected function setTag(?string $tag = null): static
    {
        if (!is_null($tag)) {
            Assertion::maxLength($tag, 64, 'tag value "%s" is too long, it should have no more than %d characters, but has %d characters.');
        }

        $this->tag = $tag;

        return $this;
    }

    public function getTag(): ?string
    {
        return $this->tag;
    }

    protected function setDestinationsTag(?string $destinationsTag = null): static
    {
        if (!is_null($destinationsTag)) {
            Assertion::maxLength($destinationsTag, 64, 'destinationsTag value "%s" is too long, it should have no more than %d characters, but has %d characters.');
        }

        $this->destinationsTag = $destinationsTag;

        return $this;
    }

    public function getDestinationsTag(): ?string
    {
        return $this->destinationsTag;
    }

    protected function setRatesTag(?string $ratesTag = null): static
    {
        if (!is_null($ratesTag)) {
            Assertion::maxLength($ratesTag, 64, 'ratesTag value "%s" is too long, it should have no more than %d characters, but has %d characters.');
        }

        $this->ratesTag = $ratesTag;

        return $this;
    }

    public function getRatesTag(): ?string
    {
        return $this->ratesTag;
    }

    protected function setRoundingMethod(string $roundingMethod): static
    {
        Assertion::maxLength($roundingMethod, 255, 'roundingMethod value "%s" is too long, it should have no more than %d characters, but has %d characters.');
        Assertion::choice(
            $roundingMethod,
            [
                TpDestinationRateInterface::ROUNDINGMETHOD_UP,
                TpDestinationRateInterface::ROUNDINGMETHOD_UPMINCOST,
            ],
            'roundingMethodvalue "%s" is not an element of the valid values: %s'
        );

        $this->roundingMethod = $roundingMethod;

        return $this;
    }

    public function getRoundingMethod(): string
    {
        return $this->roundingMethod;
    }

    protected function setRoundingDecimals(int $roundingDecimals): static
    {
        $this->roundingDecimals = $roundingDecimals;

        return $this;
    }

    public function getRoundingDecimals(): int
    {
        return $this->roundingDecimals;
    }

    protected function setMaxCost(float $maxCost): static
    {
        $this->maxCost = $maxCost;

        return $this;
    }

    public function getMaxCost(): float
    {
        return $this->maxCost;
    }

    protected function setMaxCostStrategy(string $maxCostStrategy): static
    {
        Assertion::maxLength($maxCostStrategy, 16, 'maxCostStrategy value "%s" is too long, it should have no more than %d characters, but has %d characters.');

        $this->maxCostStrategy = $maxCostStrategy;

        return $this;
    }

    public function getMaxCostStrategy(): string
    {
        return $this->maxCostStrategy;
    }

    protected function setCreatedAt($createdAt): static
    {

        $createdAt = DateTimeHelper::createOrFix(
            $createdAt,
            'CURRENT_TIMESTAMP'
        );

        if ($this->createdAt == $createdAt) {
            return $this;
        }

        $this->createdAt = $createdAt;

        return $this;
    }

    public function getCreatedAt(): \DateTime
    {
        return clone $this->createdAt;
    }

    public function setDestinationRate(DestinationRate $destinationRate): static
    {
        $this->destinationRate = $destinationRate;

        /** @var  $this */
        return $this;
    }

    public function getDestinationRate(): DestinationRate
    {
        return $this->destinationRate;
    }
}
