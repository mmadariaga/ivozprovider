<?php

namespace DataFixtures\ORM;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\Mapping\ClassMetadata;
use Ivoz\Provider\Domain\Model\MediaRelaySet\MediaRelaySet;

class ProviderMediaRelaySet extends Fixture
{
    use \DataFixtures\FixtureHelperTrait;

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $this->disableLifecycleEvents($manager);
        $manager->getClassMetadata(MediaRelaySet::class)->setIdGeneratorType(ClassMetadata::GENERATOR_TYPE_NONE);
    
        $manager->getConnection()->exec(
            "INSERT INTO MediaRelaySets (id, name, description) VALUES (0, 'Default','Default media relay set')"
        );

        $item0 = $manager->find(MediaRelaySet::class, 0);
        $this->addReference('_reference_ProviderMediaRelaySetMediaRelaySet0', $item0);

        $item1 = $this->createEntityInstanceWithPublicMethods(MediaRelaySet::class);
        $item1->setName("Test");
        $item1->setDescription("Test media relay set");
        $this->addReference('_reference_ProviderMediaRelaySetMediaRelaySet1', $item1);
        $this->sanitizeEntityValues($item1);
        $manager->persist($item1);

    
        $manager->flush();
    }
}
