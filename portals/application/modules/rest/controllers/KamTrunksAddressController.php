<?php
/**
 * KamTrunksAddress
 */

use IvozProvider\Model as Models;
use IvozProvider\Mapper\Sql as Mappers;

class Rest_KamTrunksAddressController extends Iron_Controller_Rest_BaseController
{

    protected $_cache;
    protected $_limitPage = 10;

    public function init()
    {

        parent::init();

        $front = array();
        $back = array();
        $this->_cache = new Iron\Cache\Backend\Mapper($front, $back);

    }

    /**
     * @ApiDescription(section="KamTrunksAddress", description="GET information about all KamTrunksAddress")
     * @ApiMethod(type="get")
     * @ApiRoute(name="/rest/kam-trunks-address/")
     * @ApiParams(name="page", type="int", nullable=true, description="", sample="")
     * @ApiParams(name="order", type="string", nullable=true, description="", sample="")
     * @ApiParams(name="search", type="json_encode", nullable=true, description="", sample="")
     * @ApiReturnHeaders(sample="HTTP 200 OK")
     * @ApiReturn(type="object", sample="[{
     *     'id': '', 
     *     'grp': '', 
     *     'ip_addr': '', 
     *     'mask': '', 
     *     'port': '', 
     *     'tag': ''
     * },{
     *     'id': '', 
     *     'grp': '', 
     *     'ip_addr': '', 
     *     'mask': '', 
     *     'port': '', 
     *     'tag': ''
     * }]")
     */
    public function indexAction()
    {

        $currentEtag = false;
        $ifNoneMatch = $this->getRequest()->getHeader('If-None-Match', false);

        $page = $this->getRequest()->getParam('page', 0);
        $orderParam = $this->getRequest()->getParam('order', false);
        $searchParams = $this->getRequest()->getParam('search', false);

        $fields = $this->getRequest()->getParam('fields', array());
        if (!empty($fields)) {
            $fields = explode(',', $fields);
        } else {
            $fields = array(
                'id',
                'grp',
                'ipAddr',
                'mask',
                'port',
                'tag',
            );
        }

        $order = $this->_prepareOrder($orderParam);
        $where = $this->_prepareWhere($searchParams);

        $limit = $this->_request->getParam("limit", $this->_limitPage);
        if ($limit > 250) {
            Throw new \Exception("limit argument cannot be larger than 250", 416);
        }

        $offset = $this->_prepareOffset(
            array(
                'page' => $page,
                'limit' => $limit
            )
        );

        $etag = $this->_cache->getEtagVersions('KamTrunksAddress');

        $hashEtag = md5(
            serialize(
                array($fields, $where, $order, $this->_limitPage, $offset)
            )
        );
        $currentEtag = $etag . $hashEtag;

        if ($etag !== false) {
            if ($currentEtag === $ifNoneMatch) {
                $this->status->setCode(304);
                return;
            }
        }

        $mapper = new Mappers\KamTrunksAddress();

        $items = $mapper->fetchList(
            $where,
            $order,
            $limit,
            $offset
        );

        $countItems = $mapper->countByQuery($where);

        $this->getResponse()->setHeader('totalItems', $countItems);

        if (empty($items)) {
            $this->status->setCode(204);
            return;
        }

        $data = array();

        foreach ($items as $item) {
            $data[] = $item->toArray($fields);
        }

        $this->addViewData($data);
        $this->status->setCode(200);

        if ($currentEtag !== false) {
            $this->_sendEtag($currentEtag);
        }
    }

    /**
     * @ApiDescription(section="KamTrunksAddress", description="Get information about KamTrunksAddress")
     * @ApiMethod(type="get")
     * @ApiRoute(name="/rest/kam-trunks-address/{id}")
     * @ApiParams(name="id", type="int", nullable=false, description="", sample="")
     * @ApiReturnHeaders(sample="HTTP 200 OK")
     * @ApiReturn(type="object", sample="{
     *     'id': '', 
     *     'grp': '', 
     *     'ip_addr': '', 
     *     'mask': '', 
     *     'port': '', 
     *     'tag': ''
     * }")
     */
    public function getAction()
    {
        $currentEtag = false;
        $primaryKey = $this->getRequest()->getParam('id', false);
        if ($primaryKey === false) {
            $this->status->setCode(404);
            return;
        }

        $fields = $this->getRequest()->getParam('fields', array());
        if (!empty($fields)) {
            $fields = explode(',', $fields);
        } else {
            $fields = array(
                'id',
                'grp',
                'ipAddr',
                'mask',
                'port',
                'tag',
            );
        }

        $etag = $this->_cache->getEtagVersions('KamTrunksAddress');
        $hashEtag = md5(
            serialize(
                array($fields)
            )
        );
        $currentEtag = $etag . $primaryKey . $hashEtag;

        if (!empty($etag)) {
            $ifNoneMatch = $this->getRequest()->getHeader('If-None-Match', false);
            if ($currentEtag === $ifNoneMatch) {
                $this->status->setCode(304);
                return;
            }
        }

        $mapper = new Mappers\KamTrunksAddress();
        $model = $mapper->find($primaryKey);

        if (empty($model)) {
            $this->status->setCode(404);
            return;
        }

        $this->status->setCode(200);
        $this->addViewData($model->toArray($fields));

        if ($currentEtag !== false) {
            $this->_sendEtag($currentEtag);
        }

    }

    /**
     * @ApiDescription(section="KamTrunksAddress", description="Create's a new KamTrunksAddress")
     * @ApiMethod(type="post")
     * @ApiRoute(name="/rest/kam-trunks-address/")
     * @ApiParams(name="grp", nullable=false, type="int", sample="", description="")
     * @ApiParams(name="ip_addr", nullable=true, type="varchar", sample="", description="")
     * @ApiParams(name="mask", nullable=false, type="int", sample="", description="")
     * @ApiParams(name="port", nullable=false, type="int", sample="", description="")
     * @ApiParams(name="tag", nullable=true, type="varchar", sample="", description="")
     * @ApiReturnHeaders(sample="HTTP 201")
     * @ApiReturnHeaders(sample="Location: /rest/kamtrunksaddress/{id}")
     * @ApiReturn(type="object", sample="{}")
     */
    public function postAction()
    {

        $params = $this->getRequest()->getParams();

        $model = new Models\KamTrunksAddress();

        try {
            $model->populateFromArray($params);
            $model->save();

            $this->status->setCode(201);

            $location = $this->location() . '/' . $model->getPrimaryKey();

            $this->getResponse()->setHeader('Location', $location);

        } catch (\Exception $e) {
            $this->addViewData(
                array('error' => $e->getMessage())
            );
            $this->status->setCode(404);
        }

    }

    /**
     * @ApiDescription(section="KamTrunksAddress", description="Table KamTrunksAddress")
     * @ApiMethod(type="put")
     * @ApiRoute(name="/rest/kam-trunks-address/")
     * @ApiParams(name="id", nullable=false, type="int", sample="", description="")
     * @ApiParams(name="grp", nullable=false, type="int", sample="", description="")
     * @ApiParams(name="ip_addr", nullable=true, type="varchar", sample="", description="")
     * @ApiParams(name="mask", nullable=false, type="int", sample="", description="")
     * @ApiParams(name="port", nullable=false, type="int", sample="", description="")
     * @ApiParams(name="tag", nullable=true, type="varchar", sample="", description="")
     * @ApiReturnHeaders(sample="HTTP 200")
     * @ApiReturn(type="object", sample="{}")
     */
    public function putAction()
    {

        $primaryKey = $this->getRequest()->getParam('id', false);

        if ($primaryKey === false) {
            $this->status->setCode(400);
            return;
        }

        $params = $this->getRequest()->getParams();

        $mapper = new Mappers\KamTrunksAddress();
        $model = $mapper->find($primaryKey);

        if (empty($model)) {
            $this->status->setCode(404);
            return;
        }

        try {
            $model->populateFromArray($params);
            $model->save();

            $this->addViewData($model->toArray());
            $this->status->setCode(200);
        } catch (\Exception $e) {
            $this->addViewData(
                array('error' => $e->getMessage())
            );
            $this->status->setCode(404);
        }

    }

    /**
     * @ApiDescription(section="KamTrunksAddress", description="Table KamTrunksAddress")
     * @ApiMethod(type="delete")
     * @ApiRoute(name="/rest/kam-trunks-address/")
     * @ApiParams(name="id", nullable=false, type="int", sample="", description="")
     * @ApiReturnHeaders(sample="HTTP 204")
     * @ApiReturn(type="object", sample="{}")
     */
    public function deleteAction()
    {

        $primaryKey = $this->getRequest()->getParam('id', false);

        if ($primaryKey === false) {
            $this->status->setCode(400);
            return;
        }

        $mapper = new Mappers\KamTrunksAddress();
        $model = $mapper->find($primaryKey);

        if (empty($model)) {
            $this->status->setCode(404);
            return;
        }

        try {
            $model->delete();
            $this->status->setCode(204);
        } catch (\Exception $e) {
            $this->addViewData(
                array('error' => $e->getMessage())
            );
            $this->status->setCode(404);
        }

    }


    public function optionsAction()
    {

        $this->view->GET = array(
            'description' => '',
            'params' => array(
                'id' => array(
                    'type' => "int",
                    'required' => true,
                    'comment' => '[pk]'
                )
            )
        );

        $this->view->POST = array(
            'description' => '',
            'params' => array(
                'grp' => array(
                    'type' => "int",
                    'required' => true,
                    'comment' => '',
                ),
                'ip_addr' => array(
                    'type' => "varchar",
                    'required' => false,
                    'comment' => '',
                ),
                'mask' => array(
                    'type' => "int",
                    'required' => true,
                    'comment' => '',
                ),
                'port' => array(
                    'type' => "int",
                    'required' => true,
                    'comment' => '',
                ),
                'tag' => array(
                    'type' => "varchar",
                    'required' => false,
                    'comment' => '',
                ),
            )
        );

        $this->view->PUT = array(
            'description' => '',
            'params' => array(
                'id' => array(
                    'type' => "int",
                    'required' => true,
                    'comment' => '[pk]',
                ),
                'grp' => array(
                    'type' => "int",
                    'required' => true,
                    'comment' => '',
                ),
                'ip_addr' => array(
                    'type' => "varchar",
                    'required' => false,
                    'comment' => '',
                ),
                'mask' => array(
                    'type' => "int",
                    'required' => true,
                    'comment' => '',
                ),
                'port' => array(
                    'type' => "int",
                    'required' => true,
                    'comment' => '',
                ),
                'tag' => array(
                    'type' => "varchar",
                    'required' => false,
                    'comment' => '',
                ),
            )
        );
        $this->view->DELETE = array(
            'description' => '',
            'params' => array(
                'id' => array(
                    'type' => "int",
                    'required' => true
                )
            )
        );

        $this->status->setCode(200);

    }
}
