<?php

namespace DataFixtures\ORM;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\Mapping\ClassMetadata;
use Ivoz\Provider\Domain\Model\NotificationTemplate\NotificationTemplate;
use Ivoz\Provider\Domain\Model\NotificationTemplate\NotificationTemplateInterface;

class ProviderNotificationTemplate extends Fixture implements DependentFixtureInterface
{
    use \DataFixtures\FixtureHelperTrait;

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $this->disableLifecycleEvents($manager);
        $manager->getClassMetadata(NotificationTemplate::class)->setIdGeneratorType(ClassMetadata::GENERATOR_TYPE_NONE);

        /** @var NotificationTemplateInterface $item1 */
        $item1 = $this->createEntityInstanceWithPublicMethods(NotificationTemplate::class);
        $item1->setName("Voicemail notification");
        $item1->setType("voicemail");
        $item1->setBrand($this->getReference('_reference_ProviderBrand1'));
        $this->addReference('_reference_ProviderNotificationTemplate1', $item1);
        $this->sanitizeEntityValues($item1);
        $manager->persist($item1);

    
        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            ProviderBrand::class
        );
    }
}
