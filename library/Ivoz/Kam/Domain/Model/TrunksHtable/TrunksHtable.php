<?php

namespace Ivoz\Kam\Domain\Model\TrunksHtable;

/**
 * TrunksHtable
 */
class TrunksHtable extends TrunksHtableAbstract implements TrunksHtableInterface
{
    use TrunksHtableTrait;

    /**
     * @codeCoverageIgnore
     * @return array
     */
    public function getChangeSet()
    {
        return parent::getChangeSet();
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
}

