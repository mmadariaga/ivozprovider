<?php

namespace DataFixtures\ORM;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\Mapping\ClassMetadata;
use Ivoz\Provider\Domain\Model\OutgoingRouting\OutgoingRouting;

class ProviderOutgoingRouting extends Fixture implements DependentFixtureInterface
{
    use \DataFixtures\FixtureHelperTrait;

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $this->disableLifecycleEvents($manager);
        $manager->getClassMetadata(OutgoingRouting::class)->setIdGeneratorType(ClassMetadata::GENERATOR_TYPE_NONE);
    
        $item1 = $this->createEntityInstanceWithPublicMethods(OutgoingRouting::class);
        $item1->setType("pattern");
        $item1->setPriority(1);
        $item1->setWeight(1);
        $item1->setBrand($this->getReference('_reference_ProviderBrand1'));
        $item1->setCompany($this->getReference('_reference_ProviderCompany1'));
        $item1->setPeeringContract($this->getReference('_reference_ProviderPeeringContract1'));
        $item1->setRoutingPattern($this->getReference('_reference_ProviderRoutingPatternRoutingPattern68'));
        $this->addReference('_reference_ProviderOutgoingRouting1', $item1);
        $this->sanitizeEntityValues($item1);
        $manager->persist($item1);

        $item2 = $this->createEntityInstanceWithPublicMethods(OutgoingRouting::class);
        $item2->setType("pattern");
        $item2->setPriority(11);
        $item2->setWeight(6);
        $item2->setBrand($this->getReference('_reference_ProviderBrand1'));
        $item2->setPeeringContract($this->getReference('_reference_ProviderPeeringContract1'));
        $item2->setRoutingPattern($this->getReference('_reference_ProviderRoutingPatternRoutingPattern68'));
        $this->addReference('_reference_ProviderOutgoingRouting2', $item2);
        $this->sanitizeEntityValues($item2);
        $manager->persist($item2);

    
        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            ProviderBrand::class,
            ProviderCompany::class
        );
    }
}
