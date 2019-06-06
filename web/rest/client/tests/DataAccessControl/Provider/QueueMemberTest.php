<?php

namespace Tests\DataAccessControl\Provider;

use Ivoz\Api\Core\Security\DataAccessControlParser;
use Ivoz\Provider\Domain\Model\QueueMember\QueueMember;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class QueueMemberTest extends KernelTestCase
{
    use \Ivoz\Tests\AccessControlTestHelperTrait;

    protected function getResourceClass()
    {
        return QueueMember::class;
    }

    protected function getAdminCriteria(): array
    {
        return ['username' => 'test_company_admin'];
    }

    /**
     * @test
     */
    function it_has_read_access_control()
    {
        $accessControl = $this
            ->dataAccessControlParser
            ->get(
                DataAccessControlParser::READ_ACCESS_CONTROL_ATTRIBUTE
            );

        $this->assertEquals(
            $accessControl,
            [
                [
                    'queue',
                    'in',
                    'QueueRepository([["company","IN",["CompanyRepository([[\"id\",\"eq\",\"user.getCompany().getId()\"]])"]]])'
                ]
            ]
        );
    }

    /**
     * @test
     */
    function it_has_write_access_control()
    {
        $accessControl = $this
            ->dataAccessControlParser
            ->get(
                DataAccessControlParser::WRITE_ACCESS_CONTROL_ATTRIBUTE
            );

        $this->assertEquals(
            $accessControl,
            [
                [
                    'user',
                    'in',
                    'UserRepository([["company","eq","user.getCompany().getId()"]])'
                ],
                [
                    'queue',
                    'in',
                    'QueueRepository([["company","IN",["CompanyRepository([[\"id\",\"eq\",\"user.getCompany().getId()\"]])"]]])'
                ]
            ]
        );
    }
}
