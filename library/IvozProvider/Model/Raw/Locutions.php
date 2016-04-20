<?php

/**
 * Application Model
 *
 * @package IvozProvider\Model\Raw
 * @subpackage Model
 * @author Luis Felipe Garcia
 * @copyright ZF model generator
 * @license http://framework.zend.com/license/new-bsd     New BSD License
 */

/**
 * [entity]
 *
 * @package IvozProvider\Model
 * @subpackage Model
 * @author Luis Felipe Garcia
 */

namespace IvozProvider\Model\Raw;
class Locutions extends ModelAbstract
{
    /*
     * @var \Iron_Model_Fso
     */
    protected $_fileFso;


    /**
     * Database var type int
     *
     * @var int
     */
    protected $_id;

    /**
     * Database var type int
     *
     * @var int
     */
    protected $_companyId;

    /**
     * [FSO:keepExtension]
     * Database var type int
     *
     * @var int
     */
    protected $_fileFileSize;

    /**
     * Database var type varchar
     *
     * @var string
     */
    protected $_fileMimeType;

    /**
     * Database var type varchar
     *
     * @var string
     */
    protected $_fileBaseName;

    /**
     * Database var type varchar
     *
     * @var string
     */
    protected $_name;


    /**
     * Parent relation Locutions_ibfk_1
     *
     * @var \IvozProvider\Model\Raw\Companies
     */
    protected $_Company;


    /**
     * Dependent relation ExternalCallFilters_ibfk_2
     * Type: One-to-Many relationship
     *
     * @var \IvozProvider\Model\Raw\ExternalCallFilters[]
     */
    protected $_ExternalCallFiltersByWelcomeLocution;

    /**
     * Dependent relation ExternalCallFilters_ibfk_3
     * Type: One-to-Many relationship
     *
     * @var \IvozProvider\Model\Raw\ExternalCallFilters[]
     */
    protected $_ExternalCallFiltersByHolidayLocution;

    /**
     * Dependent relation ExternalCallFilters_ibfk_4
     * Type: One-to-Many relationship
     *
     * @var \IvozProvider\Model\Raw\ExternalCallFilters[]
     */
    protected $_ExternalCallFiltersByOutOfScheduleLocution;

    /**
     * Dependent relation HolidayDates_ibfk_2
     * Type: One-to-Many relationship
     *
     * @var \IvozProvider\Model\Raw\HolidayDates[]
     */
    protected $_HolidayDates;

    /**
     * Dependent relation IVRCommon_ibfk_2
     * Type: One-to-Many relationship
     *
     * @var \IvozProvider\Model\Raw\IVRCommon[]
     */
    protected $_IVRCommonByWelcomeLocution;

    /**
     * Dependent relation IVRCommon_ibfk_3
     * Type: One-to-Many relationship
     *
     * @var \IvozProvider\Model\Raw\IVRCommon[]
     */
    protected $_IVRCommonByNoAnswerLocution;

    /**
     * Dependent relation IVRCommon_ibfk_4
     * Type: One-to-Many relationship
     *
     * @var \IvozProvider\Model\Raw\IVRCommon[]
     */
    protected $_IVRCommonByErrorLocution;

    /**
     * Dependent relation IVRCommon_ibfk_5
     * Type: One-to-Many relationship
     *
     * @var \IvozProvider\Model\Raw\IVRCommon[]
     */
    protected $_IVRCommonBySuccessLocution;

    /**
     * Dependent relation IVRCustom_ibfk_2
     * Type: One-to-Many relationship
     *
     * @var \IvozProvider\Model\Raw\IVRCustom[]
     */
    protected $_IVRCustomByWelcomeLocution;

    /**
     * Dependent relation IVRCustom_ibfk_3
     * Type: One-to-Many relationship
     *
     * @var \IvozProvider\Model\Raw\IVRCustom[]
     */
    protected $_IVRCustomByNoAnswerLocution;

    /**
     * Dependent relation IVRCustom_ibfk_4
     * Type: One-to-Many relationship
     *
     * @var \IvozProvider\Model\Raw\IVRCustom[]
     */
    protected $_IVRCustomByErrorLocution;

    /**
     * Dependent relation IVRCustom_ibfk_5
     * Type: One-to-Many relationship
     *
     * @var \IvozProvider\Model\Raw\IVRCustom[]
     */
    protected $_IVRCustomBySuccessLocution;

    /**
     * Dependent relation IVRCustomEntries_ibfk_2
     * Type: One-to-Many relationship
     *
     * @var \IvozProvider\Model\Raw\IVRCustomEntries[]
     */
    protected $_IVRCustomEntries;

    protected $_columnsList = array(
        'id'=>'id',
        'companyId'=>'companyId',
        'fileFileSize'=>'fileFileSize',
        'fileMimeType'=>'fileMimeType',
        'fileBaseName'=>'fileBaseName',
        'name'=>'name',
    );

    /**
     * Sets up column and relationship lists
     */
    public function __construct()
    {
        $this->setColumnsMeta(array(
            'fileFileSize'=> array('FSO:keepExtension'),
        ));

        $this->setMultiLangColumnsList(array(
        ));

        $this->setAvailableLangs(array('es', 'en'));

        $this->setParentList(array(
            'LocutionsIbfk1'=> array(
                    'property' => 'Company',
                    'table_name' => 'Companies',
                ),
        ));

        $this->setDependentList(array(
            'ExternalCallFiltersIbfk2' => array(
                    'property' => 'ExternalCallFiltersByWelcomeLocution',
                    'table_name' => 'ExternalCallFilters',
                ),
            'ExternalCallFiltersIbfk3' => array(
                    'property' => 'ExternalCallFiltersByHolidayLocution',
                    'table_name' => 'ExternalCallFilters',
                ),
            'ExternalCallFiltersIbfk4' => array(
                    'property' => 'ExternalCallFiltersByOutOfScheduleLocution',
                    'table_name' => 'ExternalCallFilters',
                ),
            'HolidayDatesIbfk2' => array(
                    'property' => 'HolidayDates',
                    'table_name' => 'HolidayDates',
                ),
            'IVRCommonIbfk2' => array(
                    'property' => 'IVRCommonByWelcomeLocution',
                    'table_name' => 'IVRCommon',
                ),
            'IVRCommonIbfk3' => array(
                    'property' => 'IVRCommonByNoAnswerLocution',
                    'table_name' => 'IVRCommon',
                ),
            'IVRCommonIbfk4' => array(
                    'property' => 'IVRCommonByErrorLocution',
                    'table_name' => 'IVRCommon',
                ),
            'IVRCommonIbfk5' => array(
                    'property' => 'IVRCommonBySuccessLocution',
                    'table_name' => 'IVRCommon',
                ),
            'IVRCustomIbfk2' => array(
                    'property' => 'IVRCustomByWelcomeLocution',
                    'table_name' => 'IVRCustom',
                ),
            'IVRCustomIbfk3' => array(
                    'property' => 'IVRCustomByNoAnswerLocution',
                    'table_name' => 'IVRCustom',
                ),
            'IVRCustomIbfk4' => array(
                    'property' => 'IVRCustomByErrorLocution',
                    'table_name' => 'IVRCustom',
                ),
            'IVRCustomIbfk5' => array(
                    'property' => 'IVRCustomBySuccessLocution',
                    'table_name' => 'IVRCustom',
                ),
            'IVRCustomEntriesIbfk2' => array(
                    'property' => 'IVRCustomEntries',
                    'table_name' => 'IVRCustomEntries',
                ),
        ));


        $this->setOnDeleteSetNullRelationships(array(
            'ExternalCallFilters_ibfk_2',
            'ExternalCallFilters_ibfk_3',
            'ExternalCallFilters_ibfk_4',
            'HolidayDates_ibfk_2',
            'IVRCommon_ibfk_2',
            'IVRCommon_ibfk_3',
            'IVRCommon_ibfk_4',
            'IVRCommon_ibfk_5',
            'IVRCustom_ibfk_2',
            'IVRCustom_ibfk_3',
            'IVRCustom_ibfk_4',
            'IVRCustom_ibfk_5',
            'IVRCustomEntries_ibfk_2'
        ));


        $this->_defaultValues = array(
        );

        $this->_initFileObjects();
        parent::__construct();
    }

    /**
     * This method is called just after parent's constructor
     */
    public function init()
    {
    }
    /**************************************************************************
    ************************** File System Object (FSO)************************
    ***************************************************************************/

    protected function _initFileObjects()
    {
        $this->_fileFso = new \Iron_Model_Fso($this, $this->getFileSpecs());
        $this->_fileFso->getPathResolver()->setModifiers(array('keepExtension' => true));

        return $this;
    }

    public function getFileObjects()
    {

        return array('file');
    }

    public function getFileSpecs()
    {
        return array(
            'basePath' => 'file',
            'sizeName' => 'fileFileSize',
            'mimeName' => 'fileMimeType',
            'baseNameName' => 'fileBaseName',
        );
    }

    public function putFile($filePath = '',$baseName = '')
    {
        $this->_fileFso->put($filePath);

        if (!empty($baseName)) {

            $this->_fileFso->setBaseName($baseName);
        }
    }

    public function fetchFile($autoload = true)
    {
        if ($autoload === true && $this->getfileFileSize() > 0) {

            $this->_fileFso->fetch();
        }

        return $this->_fileFso;
    }

    public function removeFile()
    {
        $this->_fileFso->remove();
        $this->_fileFso = null;

        return true;
    }

    public function getFileUrl($profile)
    {
        $fsoConfig = \Zend_Registry::get('fsoConfig');
        $profileConf = $fsoConfig->$profile;

        if (is_null($profileConf)) {
            throw new \Exception('Profile invalid. not exist in fso.ini');
        }
        $routeMap = isset($profileConf->routeMap) ? $profileConf->routeMap : $fsoConfig->config->routeMap;

        $fsoColumn = $profileConf->fso;
        $fsoSkipColumns = array(
                $fsoColumn."FileSize",
                $fsoColumn."MimeType",
        );
        $fsoBaseNameColum = $fsoColumn."BaseName";

        foreach ($this->_columnsList as $column) {
            if (in_array($column, $fsoSkipColumns)) {
                continue;
            }
            $getter = "get".ucfirst($column);
            $search = "{".$column."}";
            if ($column == $fsoBaseNameColum) {
                $search = "{basename}";
            }
            $routeMap = str_replace($search, $this->$getter(), $routeMap);
        }

        if (!$routeMap) {
            return null;
        }
        $route = array(
            'profile' => $profile,
            'routeMap' => $routeMap
        );

        $view = new \Zend_View();
        $fsoUrl = $view->serverUrl($view->url($route, 'fso'));

        return $fsoUrl;

    }


    /**************************************************************************
    *********************************** /FSO ***********************************
    ***************************************************************************/

    /**
     * Sets column Stored in ISO 8601 format.     *
     * @param int $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setId($data)
    {

        if ($this->_id != $data) {
            $this->_logChange('id');
        }

        if ($data instanceof \Zend_Db_Expr) {
            $this->_id = $data;

        } else if (!is_null($data)) {
            $this->_id = (int) $data;

        } else {
            $this->_id = $data;
        }
        return $this;
    }

    /**
     * Gets column id
     *
     * @return int
     */
    public function getId()
    {
        return $this->_id;
    }

    /**
     * Sets column Stored in ISO 8601 format.     *
     * @param int $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setCompanyId($data)
    {

        if (is_null($data)) {
            throw new \InvalidArgumentException(_('Required values cannot be null'));
        }
        if ($this->_companyId != $data) {
            $this->_logChange('companyId');
        }

        if ($data instanceof \Zend_Db_Expr) {
            $this->_companyId = $data;

        } else if (!is_null($data)) {
            $this->_companyId = (int) $data;

        } else {
            $this->_companyId = $data;
        }
        return $this;
    }

    /**
     * Gets column companyId
     *
     * @return int
     */
    public function getCompanyId()
    {
        return $this->_companyId;
    }

    /**
     * Sets column Stored in ISO 8601 format.     *
     * @param int $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setFileFileSize($data)
    {

        if ($this->_fileFileSize != $data) {
            $this->_logChange('fileFileSize');
        }

        if ($data instanceof \Zend_Db_Expr) {
            $this->_fileFileSize = $data;

        } else if (!is_null($data)) {
            $this->_fileFileSize = (int) $data;

        } else {
            $this->_fileFileSize = $data;
        }
        return $this;
    }

    /**
     * Gets column fileFileSize
     *
     * @return int
     */
    public function getFileFileSize()
    {
        return $this->_fileFileSize;
    }

    /**
     * Sets column Stored in ISO 8601 format.     *
     * @param string $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setFileMimeType($data)
    {

        if ($this->_fileMimeType != $data) {
            $this->_logChange('fileMimeType');
        }

        if ($data instanceof \Zend_Db_Expr) {
            $this->_fileMimeType = $data;

        } else if (!is_null($data)) {
            $this->_fileMimeType = (string) $data;

        } else {
            $this->_fileMimeType = $data;
        }
        return $this;
    }

    /**
     * Gets column fileMimeType
     *
     * @return string
     */
    public function getFileMimeType()
    {
        return $this->_fileMimeType;
    }

    /**
     * Sets column Stored in ISO 8601 format.     *
     * @param string $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setFileBaseName($data)
    {

        if ($this->_fileBaseName != $data) {
            $this->_logChange('fileBaseName');
        }

        if ($data instanceof \Zend_Db_Expr) {
            $this->_fileBaseName = $data;

        } else if (!is_null($data)) {
            $this->_fileBaseName = (string) $data;

        } else {
            $this->_fileBaseName = $data;
        }
        return $this;
    }

    /**
     * Gets column fileBaseName
     *
     * @return string
     */
    public function getFileBaseName()
    {
        return $this->_fileBaseName;
    }

    /**
     * Sets column Stored in ISO 8601 format.     *
     * @param string $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setName($data)
    {

        if (is_null($data)) {
            throw new \InvalidArgumentException(_('Required values cannot be null'));
        }
        if ($this->_name != $data) {
            $this->_logChange('name');
        }

        if ($data instanceof \Zend_Db_Expr) {
            $this->_name = $data;

        } else if (!is_null($data)) {
            $this->_name = (string) $data;

        } else {
            $this->_name = $data;
        }
        return $this;
    }

    /**
     * Gets column name
     *
     * @return string
     */
    public function getName()
    {
        return $this->_name;
    }

    /**
     * Sets parent relation Company
     *
     * @param \IvozProvider\Model\Raw\Companies $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setCompany(\IvozProvider\Model\Raw\Companies $data)
    {
        $this->_Company = $data;

        $primaryKey = $data->getPrimaryKey();
        if (is_array($primaryKey)) {
            $primaryKey = $primaryKey['id'];
        }

        if (!is_null($primaryKey)) {
            $this->setCompanyId($primaryKey);
        }

        $this->_setLoaded('LocutionsIbfk1');
        return $this;
    }

    /**
     * Gets parent Company
     * TODO: Mejorar esto para los casos en que la relación no exista. Ahora mismo siempre se pediría el padre
     * @return \IvozProvider\Model\Raw\Companies
     */
    public function getCompany($where = null, $orderBy = null, $avoidLoading = false)
    {
        $fkName = 'LocutionsIbfk1';

        $usingDefaultArguments = is_null($where) && is_null($orderBy);
        if (!$usingDefaultArguments) {
            $this->setNotLoaded($fkName);
        }

        $dontSkipLoading = !($avoidLoading);
        $notLoadedYet = !($this->_isLoaded($fkName));

        if ($dontSkipLoading && $notLoadedYet) {
            $related = $this->getMapper()->loadRelated('parent', $fkName, $this, $where, $orderBy);
            $this->_Company = array_shift($related);
            if ($usingDefaultArguments) {
                $this->_setLoaded($fkName);
            }
        }

        return $this->_Company;
    }

    /**
     * Sets dependent relations ExternalCallFilters_ibfk_2
     *
     * @param array $data An array of \IvozProvider\Model\Raw\ExternalCallFilters
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setExternalCallFiltersByWelcomeLocution(array $data, $deleteOrphans = false)
    {
        if ($deleteOrphans === true) {

            if ($this->_ExternalCallFiltersByWelcomeLocution === null) {

                $this->getExternalCallFiltersByWelcomeLocution();
            }

            $oldRelations = $this->_ExternalCallFiltersByWelcomeLocution;

            if (is_array($oldRelations)) {

                $dataPKs = array();

                foreach ($data as $newItem) {

                    $pk = $newItem->getPrimaryKey();
                    if (!empty($pk)) {
                        $dataPKs[] = $pk;
                    }
                }

                foreach ($oldRelations as $oldItem) {

                    if (!in_array($oldItem->getPrimaryKey(), $dataPKs)) {

                        $this->_orphans[] = $oldItem;
                    }
                }
            }
        }

        $this->_ExternalCallFiltersByWelcomeLocution = array();

        foreach ($data as $object) {
            $this->addExternalCallFiltersByWelcomeLocution($object);
        }

        return $this;
    }

    /**
     * Sets dependent relations ExternalCallFilters_ibfk_2
     *
     * @param \IvozProvider\Model\Raw\ExternalCallFilters $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function addExternalCallFiltersByWelcomeLocution(\IvozProvider\Model\Raw\ExternalCallFilters $data)
    {
        $this->_ExternalCallFiltersByWelcomeLocution[] = $data;
        $this->_setLoaded('ExternalCallFiltersIbfk2');
        return $this;
    }

    /**
     * Gets dependent ExternalCallFilters_ibfk_2
     *
     * @param string or array $where
     * @param string or array $orderBy
     * @param boolean $avoidLoading skip data loading if it is not already
     * @return array The array of \IvozProvider\Model\Raw\ExternalCallFilters
     */
    public function getExternalCallFiltersByWelcomeLocution($where = null, $orderBy = null, $avoidLoading = false)
    {
        $fkName = 'ExternalCallFiltersIbfk2';

        $usingDefaultArguments = is_null($where) && is_null($orderBy);
        if (!$usingDefaultArguments) {
            $this->setNotLoaded($fkName);
        }

        $dontSkipLoading = !($avoidLoading);
        $notLoadedYet = !($this->_isLoaded($fkName));

        if ($dontSkipLoading && $notLoadedYet) {
            $related = $this->getMapper()->loadRelated('dependent', $fkName, $this, $where, $orderBy);
            $this->_ExternalCallFiltersByWelcomeLocution = $related;
            $this->_setLoaded($fkName);
        }

        return $this->_ExternalCallFiltersByWelcomeLocution;
    }

    /**
     * Sets dependent relations ExternalCallFilters_ibfk_3
     *
     * @param array $data An array of \IvozProvider\Model\Raw\ExternalCallFilters
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setExternalCallFiltersByHolidayLocution(array $data, $deleteOrphans = false)
    {
        if ($deleteOrphans === true) {

            if ($this->_ExternalCallFiltersByHolidayLocution === null) {

                $this->getExternalCallFiltersByHolidayLocution();
            }

            $oldRelations = $this->_ExternalCallFiltersByHolidayLocution;

            if (is_array($oldRelations)) {

                $dataPKs = array();

                foreach ($data as $newItem) {

                    $pk = $newItem->getPrimaryKey();
                    if (!empty($pk)) {
                        $dataPKs[] = $pk;
                    }
                }

                foreach ($oldRelations as $oldItem) {

                    if (!in_array($oldItem->getPrimaryKey(), $dataPKs)) {

                        $this->_orphans[] = $oldItem;
                    }
                }
            }
        }

        $this->_ExternalCallFiltersByHolidayLocution = array();

        foreach ($data as $object) {
            $this->addExternalCallFiltersByHolidayLocution($object);
        }

        return $this;
    }

    /**
     * Sets dependent relations ExternalCallFilters_ibfk_3
     *
     * @param \IvozProvider\Model\Raw\ExternalCallFilters $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function addExternalCallFiltersByHolidayLocution(\IvozProvider\Model\Raw\ExternalCallFilters $data)
    {
        $this->_ExternalCallFiltersByHolidayLocution[] = $data;
        $this->_setLoaded('ExternalCallFiltersIbfk3');
        return $this;
    }

    /**
     * Gets dependent ExternalCallFilters_ibfk_3
     *
     * @param string or array $where
     * @param string or array $orderBy
     * @param boolean $avoidLoading skip data loading if it is not already
     * @return array The array of \IvozProvider\Model\Raw\ExternalCallFilters
     */
    public function getExternalCallFiltersByHolidayLocution($where = null, $orderBy = null, $avoidLoading = false)
    {
        $fkName = 'ExternalCallFiltersIbfk3';

        $usingDefaultArguments = is_null($where) && is_null($orderBy);
        if (!$usingDefaultArguments) {
            $this->setNotLoaded($fkName);
        }

        $dontSkipLoading = !($avoidLoading);
        $notLoadedYet = !($this->_isLoaded($fkName));

        if ($dontSkipLoading && $notLoadedYet) {
            $related = $this->getMapper()->loadRelated('dependent', $fkName, $this, $where, $orderBy);
            $this->_ExternalCallFiltersByHolidayLocution = $related;
            $this->_setLoaded($fkName);
        }

        return $this->_ExternalCallFiltersByHolidayLocution;
    }

    /**
     * Sets dependent relations ExternalCallFilters_ibfk_4
     *
     * @param array $data An array of \IvozProvider\Model\Raw\ExternalCallFilters
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setExternalCallFiltersByOutOfScheduleLocution(array $data, $deleteOrphans = false)
    {
        if ($deleteOrphans === true) {

            if ($this->_ExternalCallFiltersByOutOfScheduleLocution === null) {

                $this->getExternalCallFiltersByOutOfScheduleLocution();
            }

            $oldRelations = $this->_ExternalCallFiltersByOutOfScheduleLocution;

            if (is_array($oldRelations)) {

                $dataPKs = array();

                foreach ($data as $newItem) {

                    $pk = $newItem->getPrimaryKey();
                    if (!empty($pk)) {
                        $dataPKs[] = $pk;
                    }
                }

                foreach ($oldRelations as $oldItem) {

                    if (!in_array($oldItem->getPrimaryKey(), $dataPKs)) {

                        $this->_orphans[] = $oldItem;
                    }
                }
            }
        }

        $this->_ExternalCallFiltersByOutOfScheduleLocution = array();

        foreach ($data as $object) {
            $this->addExternalCallFiltersByOutOfScheduleLocution($object);
        }

        return $this;
    }

    /**
     * Sets dependent relations ExternalCallFilters_ibfk_4
     *
     * @param \IvozProvider\Model\Raw\ExternalCallFilters $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function addExternalCallFiltersByOutOfScheduleLocution(\IvozProvider\Model\Raw\ExternalCallFilters $data)
    {
        $this->_ExternalCallFiltersByOutOfScheduleLocution[] = $data;
        $this->_setLoaded('ExternalCallFiltersIbfk4');
        return $this;
    }

    /**
     * Gets dependent ExternalCallFilters_ibfk_4
     *
     * @param string or array $where
     * @param string or array $orderBy
     * @param boolean $avoidLoading skip data loading if it is not already
     * @return array The array of \IvozProvider\Model\Raw\ExternalCallFilters
     */
    public function getExternalCallFiltersByOutOfScheduleLocution($where = null, $orderBy = null, $avoidLoading = false)
    {
        $fkName = 'ExternalCallFiltersIbfk4';

        $usingDefaultArguments = is_null($where) && is_null($orderBy);
        if (!$usingDefaultArguments) {
            $this->setNotLoaded($fkName);
        }

        $dontSkipLoading = !($avoidLoading);
        $notLoadedYet = !($this->_isLoaded($fkName));

        if ($dontSkipLoading && $notLoadedYet) {
            $related = $this->getMapper()->loadRelated('dependent', $fkName, $this, $where, $orderBy);
            $this->_ExternalCallFiltersByOutOfScheduleLocution = $related;
            $this->_setLoaded($fkName);
        }

        return $this->_ExternalCallFiltersByOutOfScheduleLocution;
    }

    /**
     * Sets dependent relations HolidayDates_ibfk_2
     *
     * @param array $data An array of \IvozProvider\Model\Raw\HolidayDates
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setHolidayDates(array $data, $deleteOrphans = false)
    {
        if ($deleteOrphans === true) {

            if ($this->_HolidayDates === null) {

                $this->getHolidayDates();
            }

            $oldRelations = $this->_HolidayDates;

            if (is_array($oldRelations)) {

                $dataPKs = array();

                foreach ($data as $newItem) {

                    $pk = $newItem->getPrimaryKey();
                    if (!empty($pk)) {
                        $dataPKs[] = $pk;
                    }
                }

                foreach ($oldRelations as $oldItem) {

                    if (!in_array($oldItem->getPrimaryKey(), $dataPKs)) {

                        $this->_orphans[] = $oldItem;
                    }
                }
            }
        }

        $this->_HolidayDates = array();

        foreach ($data as $object) {
            $this->addHolidayDates($object);
        }

        return $this;
    }

    /**
     * Sets dependent relations HolidayDates_ibfk_2
     *
     * @param \IvozProvider\Model\Raw\HolidayDates $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function addHolidayDates(\IvozProvider\Model\Raw\HolidayDates $data)
    {
        $this->_HolidayDates[] = $data;
        $this->_setLoaded('HolidayDatesIbfk2');
        return $this;
    }

    /**
     * Gets dependent HolidayDates_ibfk_2
     *
     * @param string or array $where
     * @param string or array $orderBy
     * @param boolean $avoidLoading skip data loading if it is not already
     * @return array The array of \IvozProvider\Model\Raw\HolidayDates
     */
    public function getHolidayDates($where = null, $orderBy = null, $avoidLoading = false)
    {
        $fkName = 'HolidayDatesIbfk2';

        $usingDefaultArguments = is_null($where) && is_null($orderBy);
        if (!$usingDefaultArguments) {
            $this->setNotLoaded($fkName);
        }

        $dontSkipLoading = !($avoidLoading);
        $notLoadedYet = !($this->_isLoaded($fkName));

        if ($dontSkipLoading && $notLoadedYet) {
            $related = $this->getMapper()->loadRelated('dependent', $fkName, $this, $where, $orderBy);
            $this->_HolidayDates = $related;
            $this->_setLoaded($fkName);
        }

        return $this->_HolidayDates;
    }

    /**
     * Sets dependent relations IVRCommon_ibfk_2
     *
     * @param array $data An array of \IvozProvider\Model\Raw\IVRCommon
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setIVRCommonByWelcomeLocution(array $data, $deleteOrphans = false)
    {
        if ($deleteOrphans === true) {

            if ($this->_IVRCommonByWelcomeLocution === null) {

                $this->getIVRCommonByWelcomeLocution();
            }

            $oldRelations = $this->_IVRCommonByWelcomeLocution;

            if (is_array($oldRelations)) {

                $dataPKs = array();

                foreach ($data as $newItem) {

                    $pk = $newItem->getPrimaryKey();
                    if (!empty($pk)) {
                        $dataPKs[] = $pk;
                    }
                }

                foreach ($oldRelations as $oldItem) {

                    if (!in_array($oldItem->getPrimaryKey(), $dataPKs)) {

                        $this->_orphans[] = $oldItem;
                    }
                }
            }
        }

        $this->_IVRCommonByWelcomeLocution = array();

        foreach ($data as $object) {
            $this->addIVRCommonByWelcomeLocution($object);
        }

        return $this;
    }

    /**
     * Sets dependent relations IVRCommon_ibfk_2
     *
     * @param \IvozProvider\Model\Raw\IVRCommon $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function addIVRCommonByWelcomeLocution(\IvozProvider\Model\Raw\IVRCommon $data)
    {
        $this->_IVRCommonByWelcomeLocution[] = $data;
        $this->_setLoaded('IVRCommonIbfk2');
        return $this;
    }

    /**
     * Gets dependent IVRCommon_ibfk_2
     *
     * @param string or array $where
     * @param string or array $orderBy
     * @param boolean $avoidLoading skip data loading if it is not already
     * @return array The array of \IvozProvider\Model\Raw\IVRCommon
     */
    public function getIVRCommonByWelcomeLocution($where = null, $orderBy = null, $avoidLoading = false)
    {
        $fkName = 'IVRCommonIbfk2';

        $usingDefaultArguments = is_null($where) && is_null($orderBy);
        if (!$usingDefaultArguments) {
            $this->setNotLoaded($fkName);
        }

        $dontSkipLoading = !($avoidLoading);
        $notLoadedYet = !($this->_isLoaded($fkName));

        if ($dontSkipLoading && $notLoadedYet) {
            $related = $this->getMapper()->loadRelated('dependent', $fkName, $this, $where, $orderBy);
            $this->_IVRCommonByWelcomeLocution = $related;
            $this->_setLoaded($fkName);
        }

        return $this->_IVRCommonByWelcomeLocution;
    }

    /**
     * Sets dependent relations IVRCommon_ibfk_3
     *
     * @param array $data An array of \IvozProvider\Model\Raw\IVRCommon
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setIVRCommonByNoAnswerLocution(array $data, $deleteOrphans = false)
    {
        if ($deleteOrphans === true) {

            if ($this->_IVRCommonByNoAnswerLocution === null) {

                $this->getIVRCommonByNoAnswerLocution();
            }

            $oldRelations = $this->_IVRCommonByNoAnswerLocution;

            if (is_array($oldRelations)) {

                $dataPKs = array();

                foreach ($data as $newItem) {

                    $pk = $newItem->getPrimaryKey();
                    if (!empty($pk)) {
                        $dataPKs[] = $pk;
                    }
                }

                foreach ($oldRelations as $oldItem) {

                    if (!in_array($oldItem->getPrimaryKey(), $dataPKs)) {

                        $this->_orphans[] = $oldItem;
                    }
                }
            }
        }

        $this->_IVRCommonByNoAnswerLocution = array();

        foreach ($data as $object) {
            $this->addIVRCommonByNoAnswerLocution($object);
        }

        return $this;
    }

    /**
     * Sets dependent relations IVRCommon_ibfk_3
     *
     * @param \IvozProvider\Model\Raw\IVRCommon $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function addIVRCommonByNoAnswerLocution(\IvozProvider\Model\Raw\IVRCommon $data)
    {
        $this->_IVRCommonByNoAnswerLocution[] = $data;
        $this->_setLoaded('IVRCommonIbfk3');
        return $this;
    }

    /**
     * Gets dependent IVRCommon_ibfk_3
     *
     * @param string or array $where
     * @param string or array $orderBy
     * @param boolean $avoidLoading skip data loading if it is not already
     * @return array The array of \IvozProvider\Model\Raw\IVRCommon
     */
    public function getIVRCommonByNoAnswerLocution($where = null, $orderBy = null, $avoidLoading = false)
    {
        $fkName = 'IVRCommonIbfk3';

        $usingDefaultArguments = is_null($where) && is_null($orderBy);
        if (!$usingDefaultArguments) {
            $this->setNotLoaded($fkName);
        }

        $dontSkipLoading = !($avoidLoading);
        $notLoadedYet = !($this->_isLoaded($fkName));

        if ($dontSkipLoading && $notLoadedYet) {
            $related = $this->getMapper()->loadRelated('dependent', $fkName, $this, $where, $orderBy);
            $this->_IVRCommonByNoAnswerLocution = $related;
            $this->_setLoaded($fkName);
        }

        return $this->_IVRCommonByNoAnswerLocution;
    }

    /**
     * Sets dependent relations IVRCommon_ibfk_4
     *
     * @param array $data An array of \IvozProvider\Model\Raw\IVRCommon
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setIVRCommonByErrorLocution(array $data, $deleteOrphans = false)
    {
        if ($deleteOrphans === true) {

            if ($this->_IVRCommonByErrorLocution === null) {

                $this->getIVRCommonByErrorLocution();
            }

            $oldRelations = $this->_IVRCommonByErrorLocution;

            if (is_array($oldRelations)) {

                $dataPKs = array();

                foreach ($data as $newItem) {

                    $pk = $newItem->getPrimaryKey();
                    if (!empty($pk)) {
                        $dataPKs[] = $pk;
                    }
                }

                foreach ($oldRelations as $oldItem) {

                    if (!in_array($oldItem->getPrimaryKey(), $dataPKs)) {

                        $this->_orphans[] = $oldItem;
                    }
                }
            }
        }

        $this->_IVRCommonByErrorLocution = array();

        foreach ($data as $object) {
            $this->addIVRCommonByErrorLocution($object);
        }

        return $this;
    }

    /**
     * Sets dependent relations IVRCommon_ibfk_4
     *
     * @param \IvozProvider\Model\Raw\IVRCommon $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function addIVRCommonByErrorLocution(\IvozProvider\Model\Raw\IVRCommon $data)
    {
        $this->_IVRCommonByErrorLocution[] = $data;
        $this->_setLoaded('IVRCommonIbfk4');
        return $this;
    }

    /**
     * Gets dependent IVRCommon_ibfk_4
     *
     * @param string or array $where
     * @param string or array $orderBy
     * @param boolean $avoidLoading skip data loading if it is not already
     * @return array The array of \IvozProvider\Model\Raw\IVRCommon
     */
    public function getIVRCommonByErrorLocution($where = null, $orderBy = null, $avoidLoading = false)
    {
        $fkName = 'IVRCommonIbfk4';

        $usingDefaultArguments = is_null($where) && is_null($orderBy);
        if (!$usingDefaultArguments) {
            $this->setNotLoaded($fkName);
        }

        $dontSkipLoading = !($avoidLoading);
        $notLoadedYet = !($this->_isLoaded($fkName));

        if ($dontSkipLoading && $notLoadedYet) {
            $related = $this->getMapper()->loadRelated('dependent', $fkName, $this, $where, $orderBy);
            $this->_IVRCommonByErrorLocution = $related;
            $this->_setLoaded($fkName);
        }

        return $this->_IVRCommonByErrorLocution;
    }

    /**
     * Sets dependent relations IVRCommon_ibfk_5
     *
     * @param array $data An array of \IvozProvider\Model\Raw\IVRCommon
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setIVRCommonBySuccessLocution(array $data, $deleteOrphans = false)
    {
        if ($deleteOrphans === true) {

            if ($this->_IVRCommonBySuccessLocution === null) {

                $this->getIVRCommonBySuccessLocution();
            }

            $oldRelations = $this->_IVRCommonBySuccessLocution;

            if (is_array($oldRelations)) {

                $dataPKs = array();

                foreach ($data as $newItem) {

                    $pk = $newItem->getPrimaryKey();
                    if (!empty($pk)) {
                        $dataPKs[] = $pk;
                    }
                }

                foreach ($oldRelations as $oldItem) {

                    if (!in_array($oldItem->getPrimaryKey(), $dataPKs)) {

                        $this->_orphans[] = $oldItem;
                    }
                }
            }
        }

        $this->_IVRCommonBySuccessLocution = array();

        foreach ($data as $object) {
            $this->addIVRCommonBySuccessLocution($object);
        }

        return $this;
    }

    /**
     * Sets dependent relations IVRCommon_ibfk_5
     *
     * @param \IvozProvider\Model\Raw\IVRCommon $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function addIVRCommonBySuccessLocution(\IvozProvider\Model\Raw\IVRCommon $data)
    {
        $this->_IVRCommonBySuccessLocution[] = $data;
        $this->_setLoaded('IVRCommonIbfk5');
        return $this;
    }

    /**
     * Gets dependent IVRCommon_ibfk_5
     *
     * @param string or array $where
     * @param string or array $orderBy
     * @param boolean $avoidLoading skip data loading if it is not already
     * @return array The array of \IvozProvider\Model\Raw\IVRCommon
     */
    public function getIVRCommonBySuccessLocution($where = null, $orderBy = null, $avoidLoading = false)
    {
        $fkName = 'IVRCommonIbfk5';

        $usingDefaultArguments = is_null($where) && is_null($orderBy);
        if (!$usingDefaultArguments) {
            $this->setNotLoaded($fkName);
        }

        $dontSkipLoading = !($avoidLoading);
        $notLoadedYet = !($this->_isLoaded($fkName));

        if ($dontSkipLoading && $notLoadedYet) {
            $related = $this->getMapper()->loadRelated('dependent', $fkName, $this, $where, $orderBy);
            $this->_IVRCommonBySuccessLocution = $related;
            $this->_setLoaded($fkName);
        }

        return $this->_IVRCommonBySuccessLocution;
    }

    /**
     * Sets dependent relations IVRCustom_ibfk_2
     *
     * @param array $data An array of \IvozProvider\Model\Raw\IVRCustom
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setIVRCustomByWelcomeLocution(array $data, $deleteOrphans = false)
    {
        if ($deleteOrphans === true) {

            if ($this->_IVRCustomByWelcomeLocution === null) {

                $this->getIVRCustomByWelcomeLocution();
            }

            $oldRelations = $this->_IVRCustomByWelcomeLocution;

            if (is_array($oldRelations)) {

                $dataPKs = array();

                foreach ($data as $newItem) {

                    $pk = $newItem->getPrimaryKey();
                    if (!empty($pk)) {
                        $dataPKs[] = $pk;
                    }
                }

                foreach ($oldRelations as $oldItem) {

                    if (!in_array($oldItem->getPrimaryKey(), $dataPKs)) {

                        $this->_orphans[] = $oldItem;
                    }
                }
            }
        }

        $this->_IVRCustomByWelcomeLocution = array();

        foreach ($data as $object) {
            $this->addIVRCustomByWelcomeLocution($object);
        }

        return $this;
    }

    /**
     * Sets dependent relations IVRCustom_ibfk_2
     *
     * @param \IvozProvider\Model\Raw\IVRCustom $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function addIVRCustomByWelcomeLocution(\IvozProvider\Model\Raw\IVRCustom $data)
    {
        $this->_IVRCustomByWelcomeLocution[] = $data;
        $this->_setLoaded('IVRCustomIbfk2');
        return $this;
    }

    /**
     * Gets dependent IVRCustom_ibfk_2
     *
     * @param string or array $where
     * @param string or array $orderBy
     * @param boolean $avoidLoading skip data loading if it is not already
     * @return array The array of \IvozProvider\Model\Raw\IVRCustom
     */
    public function getIVRCustomByWelcomeLocution($where = null, $orderBy = null, $avoidLoading = false)
    {
        $fkName = 'IVRCustomIbfk2';

        $usingDefaultArguments = is_null($where) && is_null($orderBy);
        if (!$usingDefaultArguments) {
            $this->setNotLoaded($fkName);
        }

        $dontSkipLoading = !($avoidLoading);
        $notLoadedYet = !($this->_isLoaded($fkName));

        if ($dontSkipLoading && $notLoadedYet) {
            $related = $this->getMapper()->loadRelated('dependent', $fkName, $this, $where, $orderBy);
            $this->_IVRCustomByWelcomeLocution = $related;
            $this->_setLoaded($fkName);
        }

        return $this->_IVRCustomByWelcomeLocution;
    }

    /**
     * Sets dependent relations IVRCustom_ibfk_3
     *
     * @param array $data An array of \IvozProvider\Model\Raw\IVRCustom
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setIVRCustomByNoAnswerLocution(array $data, $deleteOrphans = false)
    {
        if ($deleteOrphans === true) {

            if ($this->_IVRCustomByNoAnswerLocution === null) {

                $this->getIVRCustomByNoAnswerLocution();
            }

            $oldRelations = $this->_IVRCustomByNoAnswerLocution;

            if (is_array($oldRelations)) {

                $dataPKs = array();

                foreach ($data as $newItem) {

                    $pk = $newItem->getPrimaryKey();
                    if (!empty($pk)) {
                        $dataPKs[] = $pk;
                    }
                }

                foreach ($oldRelations as $oldItem) {

                    if (!in_array($oldItem->getPrimaryKey(), $dataPKs)) {

                        $this->_orphans[] = $oldItem;
                    }
                }
            }
        }

        $this->_IVRCustomByNoAnswerLocution = array();

        foreach ($data as $object) {
            $this->addIVRCustomByNoAnswerLocution($object);
        }

        return $this;
    }

    /**
     * Sets dependent relations IVRCustom_ibfk_3
     *
     * @param \IvozProvider\Model\Raw\IVRCustom $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function addIVRCustomByNoAnswerLocution(\IvozProvider\Model\Raw\IVRCustom $data)
    {
        $this->_IVRCustomByNoAnswerLocution[] = $data;
        $this->_setLoaded('IVRCustomIbfk3');
        return $this;
    }

    /**
     * Gets dependent IVRCustom_ibfk_3
     *
     * @param string or array $where
     * @param string or array $orderBy
     * @param boolean $avoidLoading skip data loading if it is not already
     * @return array The array of \IvozProvider\Model\Raw\IVRCustom
     */
    public function getIVRCustomByNoAnswerLocution($where = null, $orderBy = null, $avoidLoading = false)
    {
        $fkName = 'IVRCustomIbfk3';

        $usingDefaultArguments = is_null($where) && is_null($orderBy);
        if (!$usingDefaultArguments) {
            $this->setNotLoaded($fkName);
        }

        $dontSkipLoading = !($avoidLoading);
        $notLoadedYet = !($this->_isLoaded($fkName));

        if ($dontSkipLoading && $notLoadedYet) {
            $related = $this->getMapper()->loadRelated('dependent', $fkName, $this, $where, $orderBy);
            $this->_IVRCustomByNoAnswerLocution = $related;
            $this->_setLoaded($fkName);
        }

        return $this->_IVRCustomByNoAnswerLocution;
    }

    /**
     * Sets dependent relations IVRCustom_ibfk_4
     *
     * @param array $data An array of \IvozProvider\Model\Raw\IVRCustom
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setIVRCustomByErrorLocution(array $data, $deleteOrphans = false)
    {
        if ($deleteOrphans === true) {

            if ($this->_IVRCustomByErrorLocution === null) {

                $this->getIVRCustomByErrorLocution();
            }

            $oldRelations = $this->_IVRCustomByErrorLocution;

            if (is_array($oldRelations)) {

                $dataPKs = array();

                foreach ($data as $newItem) {

                    $pk = $newItem->getPrimaryKey();
                    if (!empty($pk)) {
                        $dataPKs[] = $pk;
                    }
                }

                foreach ($oldRelations as $oldItem) {

                    if (!in_array($oldItem->getPrimaryKey(), $dataPKs)) {

                        $this->_orphans[] = $oldItem;
                    }
                }
            }
        }

        $this->_IVRCustomByErrorLocution = array();

        foreach ($data as $object) {
            $this->addIVRCustomByErrorLocution($object);
        }

        return $this;
    }

    /**
     * Sets dependent relations IVRCustom_ibfk_4
     *
     * @param \IvozProvider\Model\Raw\IVRCustom $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function addIVRCustomByErrorLocution(\IvozProvider\Model\Raw\IVRCustom $data)
    {
        $this->_IVRCustomByErrorLocution[] = $data;
        $this->_setLoaded('IVRCustomIbfk4');
        return $this;
    }

    /**
     * Gets dependent IVRCustom_ibfk_4
     *
     * @param string or array $where
     * @param string or array $orderBy
     * @param boolean $avoidLoading skip data loading if it is not already
     * @return array The array of \IvozProvider\Model\Raw\IVRCustom
     */
    public function getIVRCustomByErrorLocution($where = null, $orderBy = null, $avoidLoading = false)
    {
        $fkName = 'IVRCustomIbfk4';

        $usingDefaultArguments = is_null($where) && is_null($orderBy);
        if (!$usingDefaultArguments) {
            $this->setNotLoaded($fkName);
        }

        $dontSkipLoading = !($avoidLoading);
        $notLoadedYet = !($this->_isLoaded($fkName));

        if ($dontSkipLoading && $notLoadedYet) {
            $related = $this->getMapper()->loadRelated('dependent', $fkName, $this, $where, $orderBy);
            $this->_IVRCustomByErrorLocution = $related;
            $this->_setLoaded($fkName);
        }

        return $this->_IVRCustomByErrorLocution;
    }

    /**
     * Sets dependent relations IVRCustom_ibfk_5
     *
     * @param array $data An array of \IvozProvider\Model\Raw\IVRCustom
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setIVRCustomBySuccessLocution(array $data, $deleteOrphans = false)
    {
        if ($deleteOrphans === true) {

            if ($this->_IVRCustomBySuccessLocution === null) {

                $this->getIVRCustomBySuccessLocution();
            }

            $oldRelations = $this->_IVRCustomBySuccessLocution;

            if (is_array($oldRelations)) {

                $dataPKs = array();

                foreach ($data as $newItem) {

                    $pk = $newItem->getPrimaryKey();
                    if (!empty($pk)) {
                        $dataPKs[] = $pk;
                    }
                }

                foreach ($oldRelations as $oldItem) {

                    if (!in_array($oldItem->getPrimaryKey(), $dataPKs)) {

                        $this->_orphans[] = $oldItem;
                    }
                }
            }
        }

        $this->_IVRCustomBySuccessLocution = array();

        foreach ($data as $object) {
            $this->addIVRCustomBySuccessLocution($object);
        }

        return $this;
    }

    /**
     * Sets dependent relations IVRCustom_ibfk_5
     *
     * @param \IvozProvider\Model\Raw\IVRCustom $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function addIVRCustomBySuccessLocution(\IvozProvider\Model\Raw\IVRCustom $data)
    {
        $this->_IVRCustomBySuccessLocution[] = $data;
        $this->_setLoaded('IVRCustomIbfk5');
        return $this;
    }

    /**
     * Gets dependent IVRCustom_ibfk_5
     *
     * @param string or array $where
     * @param string or array $orderBy
     * @param boolean $avoidLoading skip data loading if it is not already
     * @return array The array of \IvozProvider\Model\Raw\IVRCustom
     */
    public function getIVRCustomBySuccessLocution($where = null, $orderBy = null, $avoidLoading = false)
    {
        $fkName = 'IVRCustomIbfk5';

        $usingDefaultArguments = is_null($where) && is_null($orderBy);
        if (!$usingDefaultArguments) {
            $this->setNotLoaded($fkName);
        }

        $dontSkipLoading = !($avoidLoading);
        $notLoadedYet = !($this->_isLoaded($fkName));

        if ($dontSkipLoading && $notLoadedYet) {
            $related = $this->getMapper()->loadRelated('dependent', $fkName, $this, $where, $orderBy);
            $this->_IVRCustomBySuccessLocution = $related;
            $this->_setLoaded($fkName);
        }

        return $this->_IVRCustomBySuccessLocution;
    }

    /**
     * Sets dependent relations IVRCustomEntries_ibfk_2
     *
     * @param array $data An array of \IvozProvider\Model\Raw\IVRCustomEntries
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function setIVRCustomEntries(array $data, $deleteOrphans = false)
    {
        if ($deleteOrphans === true) {

            if ($this->_IVRCustomEntries === null) {

                $this->getIVRCustomEntries();
            }

            $oldRelations = $this->_IVRCustomEntries;

            if (is_array($oldRelations)) {

                $dataPKs = array();

                foreach ($data as $newItem) {

                    $pk = $newItem->getPrimaryKey();
                    if (!empty($pk)) {
                        $dataPKs[] = $pk;
                    }
                }

                foreach ($oldRelations as $oldItem) {

                    if (!in_array($oldItem->getPrimaryKey(), $dataPKs)) {

                        $this->_orphans[] = $oldItem;
                    }
                }
            }
        }

        $this->_IVRCustomEntries = array();

        foreach ($data as $object) {
            $this->addIVRCustomEntries($object);
        }

        return $this;
    }

    /**
     * Sets dependent relations IVRCustomEntries_ibfk_2
     *
     * @param \IvozProvider\Model\Raw\IVRCustomEntries $data
     * @return \IvozProvider\Model\Raw\Locutions
     */
    public function addIVRCustomEntries(\IvozProvider\Model\Raw\IVRCustomEntries $data)
    {
        $this->_IVRCustomEntries[] = $data;
        $this->_setLoaded('IVRCustomEntriesIbfk2');
        return $this;
    }

    /**
     * Gets dependent IVRCustomEntries_ibfk_2
     *
     * @param string or array $where
     * @param string or array $orderBy
     * @param boolean $avoidLoading skip data loading if it is not already
     * @return array The array of \IvozProvider\Model\Raw\IVRCustomEntries
     */
    public function getIVRCustomEntries($where = null, $orderBy = null, $avoidLoading = false)
    {
        $fkName = 'IVRCustomEntriesIbfk2';

        $usingDefaultArguments = is_null($where) && is_null($orderBy);
        if (!$usingDefaultArguments) {
            $this->setNotLoaded($fkName);
        }

        $dontSkipLoading = !($avoidLoading);
        $notLoadedYet = !($this->_isLoaded($fkName));

        if ($dontSkipLoading && $notLoadedYet) {
            $related = $this->getMapper()->loadRelated('dependent', $fkName, $this, $where, $orderBy);
            $this->_IVRCustomEntries = $related;
            $this->_setLoaded($fkName);
        }

        return $this->_IVRCustomEntries;
    }

    /**
     * Returns the mapper class for this model
     *
     * @return IvozProvider\Mapper\Sql\Locutions
     */
    public function getMapper()
    {
        if ($this->_mapper === null) {

            \Zend_Loader_Autoloader::getInstance()->suppressNotFoundWarnings(true);

            if (class_exists('\IvozProvider\Mapper\Sql\Locutions')) {

                $this->setMapper(new \IvozProvider\Mapper\Sql\Locutions);

            } else {

                 new \Exception("Not a valid mapper class found");
            }

            \Zend_Loader_Autoloader::getInstance()->suppressNotFoundWarnings(false);
        }

        return $this->_mapper;
    }

    /**
     * Returns the validator class for this model
     *
     * @return null | \IvozProvider\Model\Validator\Locutions
     */
    public function getValidator()
    {
        if ($this->_validator === null) {

            if (class_exists('\IvozProvider\\Validator\Locutions')) {

                $this->setValidator(new \IvozProvider\Validator\Locutions);
            }
        }

        return $this->_validator;
    }

    public function setFromArray($data)
    {
        return $this->getMapper()->loadModel($data, $this);
    }

    /**
     * Deletes current row by deleting the row that matches the primary key
     *
     * @see \Mapper\Sql\Locutions::delete
     * @return int|boolean Number of rows deleted or boolean if doing soft delete
     */
    public function deleteRowByPrimaryKey()
    {
        if ($this->getId() === null) {
            $this->_logger->log('The value for Id cannot be null in deleteRowByPrimaryKey for ' . get_class($this), \Zend_Log::ERR);
            throw new \Exception('Primary Key does not contain a value');
        }

        return $this->getMapper()->getDbTable()->delete(
            'id = ' .
             $this->getMapper()->getDbTable()->getAdapter()->quote($this->getId())
        );
    }

    public function mustUpdateEtag()
    {
        return true;
    }

}