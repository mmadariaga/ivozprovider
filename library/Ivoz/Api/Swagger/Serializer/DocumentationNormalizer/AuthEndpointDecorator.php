<?php

namespace Ivoz\Api\Swagger\Serializer\DocumentationNormalizer;

use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class AuthEndpointDecorator implements NormalizerInterface
{
    /**
     * @var NormalizerInterface
     */
    protected $decoratedNormalizer;

    /**
     * @var \ArrayObject
     */
    protected $definitions;

    public function __construct(
        NormalizerInterface $decoratedNormalizer
    ) {
        $this->decoratedNormalizer = $decoratedNormalizer;
    }

    /**
     * {@inheritdoc}
     */
    public function supportsNormalization($data, $format = null)
    {
        return $this->decoratedNormalizer->supportsNormalization(...func_get_args());
    }

    /**
     * {@inheritdoc}
     */
    public function normalize($object, $format = null, array $context = [])
    {
        $response = $this->decoratedNormalizer->normalize(...func_get_args());
        $paths = $response['paths']->getArrayCopy();

        $authAdminDefinition = [
            'post' => [
                "tags" => [
                    "Auth"
                ],
                "operationId" => "postAdminAuthenticate",
                "consumes" => [
                    "application/x-www-form-urlencoded",
                ],
                "produces" => [
                    "application/json",
                ],
                "summary" => "Retrieve JWT token",
                "parameters" => [
                    [
                        "name" => "username",
                        "in" => "formData",
                        "type" => 'string',
                        "required" => true
                    ],
                    [
                        "name" => "password",
                        "in" => "formData",
                        "type" => 'string',
                        "required" => true
                    ]
                ],
                "responses" => [
                    "200" => [
                        "description" => "Valid credentials"
                    ],
                    "400" => [
                        "description" => "Invalid input"
                    ],
                    "401" => [
                        "description" => "Bad credentials"
                    ]
                ]
            ]
        ];

        $authUserDefinition = [
            'post' => [
                "tags" => [
                    "Auth"
                ],
                "operationId" => "postUserAuthenticate",
                "consumes" => [
                    "application/x-www-form-urlencoded",
                ],
                "produces" => [
                    "application/json",
                ],
                "summary" => "Retrieve JWT token",
                "parameters" => [
                    [
                        "name" => "email",
                        "in" => "formData",
                        "type" => 'string',
                        "required" => true
                    ],
                    [
                        "name" => "password",
                        "in" => "formData",
                        "type" => 'string',
                        "required" => true
                    ]
                ],
                "responses" => [
                    "200" => [
                        "description" => "Valid credentials"
                    ],
                    "400" => [
                        "description" => "Invalid input"
                    ],
                    "401" => [
                        "description" => "Bad credentials"
                    ]
                ]
            ]
        ];

        $auth = [
            '/admin_login' => $authAdminDefinition,
            '/user_login' => $authUserDefinition,
        ];

        $response['paths'] = array_merge($auth, $paths);
        return $response;
    }
}