<?php

namespace Ivoz\Ast\Domain\Model\Voicemail;

use Ivoz\Core\Application\DataTransferObjectInterface;
use Ivoz\Core\Application\Model\DtoNormalizer;
use Ivoz\Provider\Domain\Model\User\UserDto;
use Ivoz\Provider\Domain\Model\ResidentialDevice\ResidentialDeviceDto;

/**
* VoicemailDtoAbstract
* @codeCoverageIgnore
*/
abstract class VoicemailDtoAbstract implements DataTransferObjectInterface
{
    use DtoNormalizer;

    /**
     * @var string
     */
    private $context = '';

    /**
     * @var string
     */
    private $mailbox = '';

    /**
     * @var string|null
     */
    private $password;

    /**
     * @var string|null
     */
    private $fullname;

    /**
     * @var string|null
     */
    private $alias;

    /**
     * @var string|null
     */
    private $email;

    /**
     * @var string|null
     */
    private $pager;

    /**
     * @var string|null
     */
    private $attach;

    /**
     * @var string|null
     */
    private $attachfmt;

    /**
     * @var string|null
     */
    private $serveremail;

    /**
     * @var string|null
     */
    private $language;

    /**
     * @var string|null
     */
    private $tz;

    /**
     * @var string|null
     */
    private $deleteVoicemail;

    /**
     * @var string|null
     */
    private $saycid = 'yes';

    /**
     * @var string|null
     */
    private $sendVoicemail;

    /**
     * @var string|null
     */
    private $review;

    /**
     * @var string|null
     */
    private $tempgreetwarn;

    /**
     * @var string|null
     */
    private $operator;

    /**
     * @var string|null
     */
    private $envelope;

    /**
     * @var int|null
     */
    private $sayduration;

    /**
     * @var string|null
     */
    private $forcename;

    /**
     * @var string|null
     */
    private $forcegreetings;

    /**
     * @var string|null
     */
    private $callback;

    /**
     * @var string|null
     */
    private $dialout;

    /**
     * @var string|null
     */
    private $exitcontext;

    /**
     * @var int|null
     */
    private $maxmsg;

    /**
     * @var float|null
     */
    private $volgain;

    /**
     * @var string|null
     */
    private $imapuser;

    /**
     * @var string|null
     */
    private $imappassword;

    /**
     * @var string|null
     */
    private $imapserver;

    /**
     * @var string|null
     */
    private $imapport;

    /**
     * @var string|null
     */
    private $imapflags;

    /**
     * @var \DateTime|string|null
     */
    private $stamp;

    /**
     * @var int
     */
    private $id;

    /**
     * @var UserDto | null
     */
    private $user;

    /**
     * @var ResidentialDeviceDto | null
     */
    private $residentialDevice;

    public function __construct($id = null)
    {
        $this->setId($id);
    }

    /**
    * @inheritdoc
    */
    public static function getPropertyMap(string $context = '', string $role = null)
    {
        if ($context === self::CONTEXT_COLLECTION) {
            return ['id' => 'id'];
        }

        return [
            'context' => 'context',
            'mailbox' => 'mailbox',
            'password' => 'password',
            'fullname' => 'fullname',
            'alias' => 'alias',
            'email' => 'email',
            'pager' => 'pager',
            'attach' => 'attach',
            'attachfmt' => 'attachfmt',
            'serveremail' => 'serveremail',
            'language' => 'language',
            'tz' => 'tz',
            'deleteVoicemail' => 'deleteVoicemail',
            'saycid' => 'saycid',
            'sendVoicemail' => 'sendVoicemail',
            'review' => 'review',
            'tempgreetwarn' => 'tempgreetwarn',
            'operator' => 'operator',
            'envelope' => 'envelope',
            'sayduration' => 'sayduration',
            'forcename' => 'forcename',
            'forcegreetings' => 'forcegreetings',
            'callback' => 'callback',
            'dialout' => 'dialout',
            'exitcontext' => 'exitcontext',
            'maxmsg' => 'maxmsg',
            'volgain' => 'volgain',
            'imapuser' => 'imapuser',
            'imappassword' => 'imappassword',
            'imapserver' => 'imapserver',
            'imapport' => 'imapport',
            'imapflags' => 'imapflags',
            'stamp' => 'stamp',
            'id' => 'id',
            'userId' => 'user',
            'residentialDeviceId' => 'residentialDevice'
        ];
    }

    /**
    * @return array
    */
    public function toArray($hideSensitiveData = false)
    {
        $response = [
            'context' => $this->getContext(),
            'mailbox' => $this->getMailbox(),
            'password' => $this->getPassword(),
            'fullname' => $this->getFullname(),
            'alias' => $this->getAlias(),
            'email' => $this->getEmail(),
            'pager' => $this->getPager(),
            'attach' => $this->getAttach(),
            'attachfmt' => $this->getAttachfmt(),
            'serveremail' => $this->getServeremail(),
            'language' => $this->getLanguage(),
            'tz' => $this->getTz(),
            'deleteVoicemail' => $this->getDeleteVoicemail(),
            'saycid' => $this->getSaycid(),
            'sendVoicemail' => $this->getSendVoicemail(),
            'review' => $this->getReview(),
            'tempgreetwarn' => $this->getTempgreetwarn(),
            'operator' => $this->getOperator(),
            'envelope' => $this->getEnvelope(),
            'sayduration' => $this->getSayduration(),
            'forcename' => $this->getForcename(),
            'forcegreetings' => $this->getForcegreetings(),
            'callback' => $this->getCallback(),
            'dialout' => $this->getDialout(),
            'exitcontext' => $this->getExitcontext(),
            'maxmsg' => $this->getMaxmsg(),
            'volgain' => $this->getVolgain(),
            'imapuser' => $this->getImapuser(),
            'imappassword' => $this->getImappassword(),
            'imapserver' => $this->getImapserver(),
            'imapport' => $this->getImapport(),
            'imapflags' => $this->getImapflags(),
            'stamp' => $this->getStamp(),
            'id' => $this->getId(),
            'user' => $this->getUser(),
            'residentialDevice' => $this->getResidentialDevice()
        ];

        if (!$hideSensitiveData) {
            return $response;
        }

        foreach ($this->sensitiveFields as $sensitiveField) {
            if (!array_key_exists($sensitiveField, $response)) {
                throw new \Exception($sensitiveField . ' field was not found');
            }
            $response[$sensitiveField] = '*****';
        }

        return $response;
    }

    public function setContext(?string $context): static
    {
        $this->context = $context;

        return $this;
    }

    public function getContext(): ?string
    {
        return $this->context;
    }

    public function setMailbox(?string $mailbox): static
    {
        $this->mailbox = $mailbox;

        return $this;
    }

    public function getMailbox(): ?string
    {
        return $this->mailbox;
    }

    public function setPassword(?string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setFullname(?string $fullname): static
    {
        $this->fullname = $fullname;

        return $this;
    }

    public function getFullname(): ?string
    {
        return $this->fullname;
    }

    public function setAlias(?string $alias): static
    {
        $this->alias = $alias;

        return $this;
    }

    public function getAlias(): ?string
    {
        return $this->alias;
    }

    public function setEmail(?string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setPager(?string $pager): static
    {
        $this->pager = $pager;

        return $this;
    }

    public function getPager(): ?string
    {
        return $this->pager;
    }

    public function setAttach(?string $attach): static
    {
        $this->attach = $attach;

        return $this;
    }

    public function getAttach(): ?string
    {
        return $this->attach;
    }

    public function setAttachfmt(?string $attachfmt): static
    {
        $this->attachfmt = $attachfmt;

        return $this;
    }

    public function getAttachfmt(): ?string
    {
        return $this->attachfmt;
    }

    public function setServeremail(?string $serveremail): static
    {
        $this->serveremail = $serveremail;

        return $this;
    }

    public function getServeremail(): ?string
    {
        return $this->serveremail;
    }

    public function setLanguage(?string $language): static
    {
        $this->language = $language;

        return $this;
    }

    public function getLanguage(): ?string
    {
        return $this->language;
    }

    public function setTz(?string $tz): static
    {
        $this->tz = $tz;

        return $this;
    }

    public function getTz(): ?string
    {
        return $this->tz;
    }

    public function setDeleteVoicemail(?string $deleteVoicemail): static
    {
        $this->deleteVoicemail = $deleteVoicemail;

        return $this;
    }

    public function getDeleteVoicemail(): ?string
    {
        return $this->deleteVoicemail;
    }

    public function setSaycid(?string $saycid): static
    {
        $this->saycid = $saycid;

        return $this;
    }

    public function getSaycid(): ?string
    {
        return $this->saycid;
    }

    public function setSendVoicemail(?string $sendVoicemail): static
    {
        $this->sendVoicemail = $sendVoicemail;

        return $this;
    }

    public function getSendVoicemail(): ?string
    {
        return $this->sendVoicemail;
    }

    public function setReview(?string $review): static
    {
        $this->review = $review;

        return $this;
    }

    public function getReview(): ?string
    {
        return $this->review;
    }

    public function setTempgreetwarn(?string $tempgreetwarn): static
    {
        $this->tempgreetwarn = $tempgreetwarn;

        return $this;
    }

    public function getTempgreetwarn(): ?string
    {
        return $this->tempgreetwarn;
    }

    public function setOperator(?string $operator): static
    {
        $this->operator = $operator;

        return $this;
    }

    public function getOperator(): ?string
    {
        return $this->operator;
    }

    public function setEnvelope(?string $envelope): static
    {
        $this->envelope = $envelope;

        return $this;
    }

    public function getEnvelope(): ?string
    {
        return $this->envelope;
    }

    public function setSayduration(?int $sayduration): static
    {
        $this->sayduration = $sayduration;

        return $this;
    }

    public function getSayduration(): ?int
    {
        return $this->sayduration;
    }

    public function setForcename(?string $forcename): static
    {
        $this->forcename = $forcename;

        return $this;
    }

    public function getForcename(): ?string
    {
        return $this->forcename;
    }

    public function setForcegreetings(?string $forcegreetings): static
    {
        $this->forcegreetings = $forcegreetings;

        return $this;
    }

    public function getForcegreetings(): ?string
    {
        return $this->forcegreetings;
    }

    public function setCallback(?string $callback): static
    {
        $this->callback = $callback;

        return $this;
    }

    public function getCallback(): ?string
    {
        return $this->callback;
    }

    public function setDialout(?string $dialout): static
    {
        $this->dialout = $dialout;

        return $this;
    }

    public function getDialout(): ?string
    {
        return $this->dialout;
    }

    public function setExitcontext(?string $exitcontext): static
    {
        $this->exitcontext = $exitcontext;

        return $this;
    }

    public function getExitcontext(): ?string
    {
        return $this->exitcontext;
    }

    public function setMaxmsg(?int $maxmsg): static
    {
        $this->maxmsg = $maxmsg;

        return $this;
    }

    public function getMaxmsg(): ?int
    {
        return $this->maxmsg;
    }

    public function setVolgain(?float $volgain): static
    {
        $this->volgain = $volgain;

        return $this;
    }

    public function getVolgain(): ?float
    {
        return $this->volgain;
    }

    public function setImapuser(?string $imapuser): static
    {
        $this->imapuser = $imapuser;

        return $this;
    }

    public function getImapuser(): ?string
    {
        return $this->imapuser;
    }

    public function setImappassword(?string $imappassword): static
    {
        $this->imappassword = $imappassword;

        return $this;
    }

    public function getImappassword(): ?string
    {
        return $this->imappassword;
    }

    public function setImapserver(?string $imapserver): static
    {
        $this->imapserver = $imapserver;

        return $this;
    }

    public function getImapserver(): ?string
    {
        return $this->imapserver;
    }

    public function setImapport(?string $imapport): static
    {
        $this->imapport = $imapport;

        return $this;
    }

    public function getImapport(): ?string
    {
        return $this->imapport;
    }

    public function setImapflags(?string $imapflags): static
    {
        $this->imapflags = $imapflags;

        return $this;
    }

    public function getImapflags(): ?string
    {
        return $this->imapflags;
    }

    public function setStamp(null|\DateTime|string $stamp): static
    {
        $this->stamp = $stamp;

        return $this;
    }

    public function getStamp(): \DateTime|string|null
    {
        return $this->stamp;
    }

    public function setId($id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setUser(?UserDto $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getUser(): ?UserDto
    {
        return $this->user;
    }

    public function setUserId($id): static
    {
        $value = !is_null($id)
            ? new UserDto($id)
            : null;

        return $this->setUser($value);
    }

    public function getUserId()
    {
        if ($dto = $this->getUser()) {
            return $dto->getId();
        }

        return null;
    }

    public function setResidentialDevice(?ResidentialDeviceDto $residentialDevice): static
    {
        $this->residentialDevice = $residentialDevice;

        return $this;
    }

    public function getResidentialDevice(): ?ResidentialDeviceDto
    {
        return $this->residentialDevice;
    }

    public function setResidentialDeviceId($id): static
    {
        $value = !is_null($id)
            ? new ResidentialDeviceDto($id)
            : null;

        return $this->setResidentialDevice($value);
    }

    public function getResidentialDeviceId()
    {
        if ($dto = $this->getResidentialDevice()) {
            return $dto->getId();
        }

        return null;
    }
}
