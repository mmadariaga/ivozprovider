<?php

namespace Ivoz\Provider\Infrastructure\Persistence\Doctrine;

use Doctrine\ORM\EntityRepository;
use Ivoz\Provider\Domain\Model\User\UserRepository;

/**
 * UserDoctrineRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class UserDoctrineRepository extends EntityRepository implements UserRepository
{
    const ENTITY_ALIAS = 'user';

    public function getAssignedTerminalIds()
    {
        $qb = $this->createQueryBuilder(self::ENTITY_ALIAS);
        $where = $qb->expr()->isNotNull(self::ENTITY_ALIAS . '.terminal');
        $qb->select('IDENTITY(user.terminal)')
           ->where(
               $where
           );

        $results = $qb
            ->getQuery()
            ->getScalarResult();

        $response = [];
        foreach ($results as $result) {
            $response[] = array_shift($result);
        }

        return $response;

    }

}