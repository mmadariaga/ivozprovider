<?php

namespace Ivoz\Core\Domain\Model\Helper;

use Doctrine\Common\Collections\Criteria;

interface CriteriaHelperInterface
{
    /**
     * @param array $conditions
     * @return Criteria
     *
     * @example
     * $criteria = [
     *      'or' => array(
     *          array('field1', 'like', '%field1Value%'),
     *          array('field2', 'like', '%field2Value%')
     *      ),
     *      'and' => array(
     *          array('field3', 'eq', 3),
     *          array('field4', 'eq', 'four')
     *      ),
     *      array('field5', 'neq', 5)
     * ];
     */
    public static function fromArray(array $conditions);
}