<?php

namespace Ivoz\Kam\Infrastructure\Persistence\Doctrine;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Ivoz\Kam\Domain\Model\UsersPresentity\UsersPresentityRepository;
use Ivoz\Kam\Domain\Model\UsersPresentity\UsersPresentity;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * UsersPresentityDoctrineRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class UsersPresentityDoctrineRepository extends ServiceEntityRepository implements UsersPresentityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, UsersPresentity::class);
    }
}
