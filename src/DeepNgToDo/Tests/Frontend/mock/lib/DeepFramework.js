DeepFramework.Kernel.load({
  "env": "prod",
  "deployId": "a37e7317193c999712779dd49eb1c886",
  "awsRegion": "us-east-1",
  "models": [
    {
      "Account": {
        "OwnerId": "string",
        "Name": "string",
        "Email": "string",
        "Users": "stringSet",
        "Description": "string",
        "MarkedAs": "string",
        "Id": "timeUUID"
      }
    },
    {
      "ActivityLog": {
        "AccountId": "string",
        "AccountName": "string",
        "UserEmail": "string",
        "ElementType": "string",
        "ActionType": "string",
        "ElementName": "string",
        "Id": "timeUUID"
      }
    },
    {
      "Role": {
        "Name": "string",
        "Description": "string",
        "Domains": "stringSet",
        "Resorces": "stringSet",
        "IamRole": {
          "Name": "string",
          "Arn": "string"
        },
        "Id": "timeUUID"
      }
    },
    {
      "User": {
        "Id": "string",
        "Email": "string",
        "Name": "string",
        "Nickname": "string",
        "UpdatedOnUTC": "string",
        "Roles": "stringSet",
        "NumberOfAccounts": "number"
      }
    },
    {
      "Billing": {
        "Id": "string",
        "Card": {
          "address_city": "string",
          "address_country": "string",
          "address_line1": "string",
          "address_line1_check": "string",
          "address_line2": "string",
          "address_state": "string",
          "address_zip": "string",
          "address_zip_check": "string",
          "brand": "string",
          "country": "string",
          "customer": "string",
          "cvc_check": "string",
          "dynamic_last4": "string",
          "exp_month": "number",
          "exp_year": "number",
          "fingerprint": "string",
          "funding": "string",
          "id": "string",
          "last4": "string",
          "name": "string",
          "object": "string"
        },
        "Customer": {
          "account_balance": "number",
          "created": "number",
          "currency": "string",
          "default_source": "string",
          "delinquent": "boolean",
          "description": "string",
          "discount": {
            "coupon": {
              "id": "string",
              "created": "number",
              "percent_off": "number",
              "amount_off": "number",
              "currency": "string",
              "object": "string",
              "livemode": "boolean",
              "duration": "string",
              "redeem_by": "number",
              "max_redemptions": "number",
              "times_redeemed": "number",
              "duration_in_months": "number",
              "valid": "boolean"
            },
            "start": "number",
            "object": "string",
            "customer": "string",
            "subscription": "string",
            "end": "number"
          },
          "email": "string",
          "id": "string",
          "livemode": "boolean",
          "metadata": {
            "userId": "string"
          },
          "object": "string",
          "sources": {
            "has_more": "boolean",
            "object": "string",
            "total_count": "number",
            "url": "string"
          },
          "subscriptions": {
            "has_more": "boolean",
            "object": "string",
            "total_count": "number",
            "url": "string"
          }
        },
        "Subscription": {
          "application_fee_percent": "number",
          "cancel_at_period_end": "boolean",
          "canceled_at": "number",
          "current_period_end": "number",
          "current_period_start": "number",
          "customer": "string",
          "discount": {
            "coupon": {
              "id": "string",
              "created": "number",
              "percent_off": "number",
              "amount_off": "number",
              "currency": "string",
              "object": "string",
              "livemode": "boolean",
              "duration": "string",
              "redeem_by": "number",
              "max_redemptions": "number",
              "times_redeemed": "number",
              "duration_in_months": "number",
              "valid": "boolean"
            },
            "start": "number",
            "object": "string",
            "customer": "string",
            "subscription": "string",
            "end": "number"
          },
          "ended_at": "number",
          "id": "string",
          "object": "string",
          "plan": {
            "amount": "number",
            "created": "number",
            "currency": "string",
            "id": "string",
            "interval": "string",
            "interval_count": "number",
            "livemode": "boolean",
            "metadata": {
              "core": "string",
              "properties": "string",
              "rank": "string",
              "storage": "string",
              "users": "string"
            },
            "name": "string",
            "object": "string",
            "statement_descriptor": "string",
            "trial_period_days": "number"
          },
          "quantity": "number",
          "start": "number",
          "status": "string",
          "tax_percent": "number",
          "trial_end": "number",
          "trial_start": "number"
        }
      }
    },
    {
      "Property": {
        "Description": "string",
        "Environments": {
          "Development": {
            "AWSAccount": {
              "Route53": {
                "AccessKeyID": "string",
                "HostedZoneId": "string",
                "SecretAccessKey": "string"
              },
              "S3": {
                "AccessKeyID": "string",
                "Bucket": "string",
                "Region": "string",
                "SecretAccessKey": "string"
              }
            },
            "DeployStatus": "string",
            "Hostname": "string",
            "Name": "string",
            "Settings": {
              "ActiveItem": "string",
              "ActiveSetting": "string",
              "Backend": {
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Lambda": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "API Gateway": {
                  "Configuration": "string",
                  "Status": "string"
                }
              },
              "CodeRepo": {
                "Crawl": {
                  "Configuration": "string",
                  "SourceURL": "string",
                  "Status": "string"
                },
                "Git": {
                  "Branch": "string",
                  "Configuration": "string",
                  "Path": "string",
                  "PrivateKey": "string",
                  "PublicKey": "string",
                  "Repository": "string",
                  "Status": "string"
                },
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "S3": {
                  "Configuration": "string",
                  "Setup": "string",
                  "Status": "string"
                },
                "Source": "string"
              },
              "Database": {
                "DynamoDB": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "ElasticCache": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Local Storage": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                }
              },
              "Frontend": {
                "CloudFront": {
                  "Configuration": "string",
                  "DomainName": "string",
                  "Id": "string",
                  "Status": "string"
                },
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Name": "string"
              },
              "Security": {
                "Amazon": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Auth0": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Cognito": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                }
              }
            }
          },
          "Production": {
            "AWSAccount": {
              "Route53": {
                "AccessKeyID": "string",
                "HostedZoneId": "string",
                "SecretAccessKey": "string"
              },
              "S3": {
                "AccessKeyID": "string",
                "Bucket": "string",
                "Region": "string",
                "SecretAccessKey": "string"
              }
            },
            "DeployStatus": "string",
            "Hostname": "string",
            "Name": "string",
            "Settings": {
              "ActiveItem": "string",
              "ActiveSetting": "string",
              "Backend": {
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Lambda": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "API Gateway": {
                  "Configuration": "string",
                  "Status": "string"
                }
              },
              "CodeRepo": {
                "Crawl": {
                  "Configuration": "string",
                  "SourceURL": "string",
                  "Status": "string"
                },
                "Git": {
                  "Branch": "string",
                  "Configuration": "string",
                  "Path": "string",
                  "PrivateKey": "string",
                  "PublicKey": "string",
                  "Repository": "string",
                  "Status": "string"
                },
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "S3": {
                  "Configuration": "string",
                  "Setup": "string",
                  "Status": "string"
                },
                "Source": "string"
              },
              "Database": {
                "DynamoDB": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "ElasticCache": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Local Storage": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                }
              },
              "Frontend": {
                "CloudFront": {
                  "Configuration": "string",
                  "DomainName": "string",
                  "Id": "string",
                  "Status": "string"
                },
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                }
              },
              "Security": {
                "Amazon": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Auth0": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Cognito": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                }
              }
            }
          },
          "Staging": {
            "AWSAccount": {
              "Route53": {
                "AccessKeyID": "string",
                "HostedZoneId": "string",
                "SecretAccessKey": "string"
              },
              "S3": {
                "AccessKeyID": "string",
                "Bucket": "string",
                "Region": "string",
                "SecretAccessKey": "string"
              }
            },
            "DeployStatus": "string",
            "Hostname": "string",
            "Name": "string",
            "Settings": {
              "ActiveItem": "string",
              "ActiveSetting": "string",
              "Backend": {
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Lambda": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "API Gateway": {
                  "Configuration": "string",
                  "Status": "string"
                }
              },
              "CodeRepo": {
                "Crawl": {
                  "Configuration": "string",
                  "SourceURL": "string",
                  "Status": "string"
                },
                "Git": {
                  "Branch": "string",
                  "Configuration": "string",
                  "Path": "string",
                  "PrivateKey": "string",
                  "PublicKey": "string",
                  "Repository": "string",
                  "Status": "string"
                },
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "S3": {
                  "Configuration": "string",
                  "Setup": "string",
                  "Status": "string"
                },
                "Source": "string"
              },
              "Database": {
                "DynamoDB": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "ElasticCache": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Local Storage": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                }
              },
              "Frontend": {
                "CloudFront": {
                  "Configuration": "string",
                  "DomainName": "string",
                  "Id": "string",
                  "Status": "string"
                },
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                }
              },
              "Security": {
                "Amazon": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Auth0": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Cognito": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                }
              }
            }
          },
          "Testing": {
            "AWSAccount": {
              "Route53": {
                "AccessKeyID": "string",
                "HostedZoneId": "string",
                "SecretAccessKey": "string"
              },
              "S3": {
                "AccessKeyID": "string",
                "Bucket": "string",
                "Region": "string",
                "SecretAccessKey": "string"
              }
            },
            "DeployStatus": "string",
            "Hostname": "string",
            "Name": "string",
            "Settings": {
              "ActiveItem": "string",
              "ActiveSetting": "string",
              "Backend": {
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Lambda": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "API Gateway": {
                  "Configuration": "string",
                  "Status": "string"
                }
              },
              "CodeRepo": {
                "Crawl": {
                  "Configuration": "string",
                  "SourceURL": "string",
                  "Status": "string"
                },
                "Git": {
                  "Branch": "string",
                  "Configuration": "string",
                  "Path": "string",
                  "PrivateKey": "string",
                  "PublicKey": "string",
                  "Repository": "string",
                  "Status": "string"
                },
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "S3": {
                  "Configuration": "string",
                  "Setup": "string",
                  "Status": "string"
                },
                "Source": "string"
              },
              "Database": {
                "DynamoDB": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "ElasticCache": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Local Storage": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                }
              },
              "Frontend": {
                "CloudFront": {
                  "Configuration": "string",
                  "DomainName": "string",
                  "Id": "string",
                  "Status": "string"
                },
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                }
              },
              "Security": {
                "Amazon": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Auth0": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "Cognito": {
                  "Configuration": "string",
                  "Status": "string"
                },
                "IAM": {
                  "Configuration": "string",
                  "Status": "string"
                }
              }
            }
          }
        },
        "Favorite": "boolean",
        "Id": "string",
        "Name": "string",
        "AccountId": "string"
      }
    }
  ],
  "identityPoolId": "us-east-1:1e6b7663-19ff-4a81-bc94-219716d5ec2d",
  "identityProviders": {
    "www.amazon.com": "amzn1.application.12057697ba3347cda73dd9f6d3b9ce2b"
  },
  "microservices": {
    "deep.mg.auth": {
      "isRoot": false,
      "parameters": {},
      "resources": {
        "user": {
          "create": {
            "type": "lambda",
            "methods": [
              "POST"
            ],
            "source": "DeepProdUserCreate8df110df",
            "region": "us-east-1"
          },
          "retrieve": {
            "type": "lambda",
            "methods": [
              "GET"
            ],
            "source": "DeepProdUserRetrieve8df110df",
            "region": "us-east-1"
          }
        },
        "account": {
          "create": {
            "type": "lambda",
            "methods": [
              "POST"
            ],
            "source": "DeepProdAccountCreate8df110df",
            "region": "us-east-1"
          },
          "retrieve": {
            "type": "lambda",
            "methods": [
              "GET"
            ],
            "source": "DeepProdAccountRetrieve8df110df",
            "region": "us-east-1"
          },
          "delete": {
            "type": "lambda",
            "methods": [
              "DELETE"
            ],
            "source": "DeepProdAccountDelete8df110df",
            "region": "us-east-1"
          },
          "update": {
            "type": "lambda",
            "methods": [
              "PUT"
            ],
            "source": "DeepProdAccountUpdate8df110df",
            "region": "us-east-1"
          },
          "link-user": {
            "type": "lambda",
            "methods": [
              "POST"
            ],
            "source": "DeepProdAccountLinkUser8df110df",
            "region": "us-east-1"
          },
          "unlink-user": {
            "type": "lambda",
            "methods": [
              "POST"
            ],
            "source": "DeepProdAccountUnlinkUser8df110df",
            "region": "us-east-1"
          }
        },
        "activity-log": {
          "create": {
            "type": "lambda",
            "methods": [
              "POST"
            ],
            "source": "DeepProdActivityLogCreate8df110df",
            "region": "us-east-1"
          },
          "delete": {
            "type": "lambda",
            "methods": [
              "DELETE"
            ],
            "source": "DeepProdActivityLogDelete8df110df",
            "region": "us-east-1"
          },
          "retrieve": {
            "type": "lambda",
            "methods": [
              "GET"
            ],
            "source": "DeepProdActivityLogRetrieve8df110df",
            "region": "us-east-1"
          }
        }
      }
    },
    "deep.mg.billing": {
      "isRoot": false,
      "parameters": {
        "stripe": {
          "dev": "sk_test_CVksrkepcyBGDRZSTN781GoK",
          "prod": "sk_live_rscGxB27MTM6odLjfG2TRUqm"
        }
      },
      "resources": {
        "stripe-customer": {
          "create": {
            "type": "lambda",
            "methods": [
              "POST"
            ],
            "source": "DeepProdStripeCustomerCreateafce2858",
            "region": "us-east-1"
          },
          "delete": {
            "type": "lambda",
            "methods": [
              "DELETE"
            ],
            "source": "DeepProdStripeCustomerDeleteafce2858",
            "region": "us-east-1"
          },
          "update": {
            "type": "lambda",
            "methods": [
              "PUT"
            ],
            "source": "DeepProdStripeCustomerUpdateafce2858",
            "region": "us-east-1"
          },
          "retrieve": {
            "type": "lambda",
            "methods": [
              "GET"
            ],
            "source": "DeepProdStripeCustomerRetrieveafce2858",
            "region": "us-east-1"
          }
        },
        "stripe-card": {
          "create": {
            "type": "lambda",
            "methods": [
              "POST"
            ],
            "source": "DeepProdStripeCardCreateafce2858",
            "region": "us-east-1"
          },
          "delete": {
            "type": "lambda",
            "methods": [
              "DELETE"
            ],
            "source": "DeepProdStripeCardDeleteafce2858",
            "region": "us-east-1"
          },
          "update": {
            "type": "lambda",
            "methods": [
              "PUT"
            ],
            "source": "DeepProdStripeCardUpdateafce2858",
            "region": "us-east-1"
          },
          "retrieve": {
            "type": "lambda",
            "methods": [
              "GET"
            ],
            "source": "DeepProdStripeCardRetrieveafce2858",
            "region": "us-east-1"
          }
        },
        "stripe-subscription": {
          "create": {
            "type": "lambda",
            "methods": [
              "POST"
            ],
            "source": "DeepProdStripeSubscriptionCreateafce2858",
            "region": "us-east-1"
          },
          "delete": {
            "type": "lambda",
            "methods": [
              "DELETE"
            ],
            "source": "DeepProdStripeSubscriptionDeleteafce2858",
            "region": "us-east-1"
          },
          "update": {
            "type": "lambda",
            "methods": [
              "PUT"
            ],
            "source": "DeepProdStripeSubscriptionUpdateafce2858",
            "region": "us-east-1"
          },
          "retrieve": {
            "type": "lambda",
            "methods": [
              "GET"
            ],
            "source": "DeepProdStripeSubscriptionRetrieveafce2858",
            "region": "us-east-1"
          }
        },
        "stripe-receipt": {
          "retrieve": {
            "type": "lambda",
            "methods": [
              "GET"
            ],
            "source": "DeepProdStripeReceiptRetrieveafce2858",
            "region": "us-east-1"
          },
          "create": {
            "type": "lambda",
            "methods": [
              "GET"
            ],
            "source": "DeepProdStripeReceiptCreateafce2858",
            "region": "us-east-1"
          }
        }
      }
    },
    "deep.mg.core": {
      "isRoot": true,
      "parameters": {},
      "resources": {}
    },
    "deep.mg.photo": {
      "isRoot": false,
      "parameters": {},
      "resources": {}
    },
    "deep.mg.property": {
      "isRoot": false,
      "parameters": {},
      "resources": {
        "property": {
          "create": {
            "type": "lambda",
            "methods": [
              "POST"
            ],
            "source": "DeepProdPropertyCreate585a3b99",
            "region": "us-east-1"
          },
          "retrieve": {
            "type": "lambda",
            "methods": [
              "GET"
            ],
            "source": "DeepProdPropertyRetrieve585a3b99",
            "region": "us-east-1"
          },
          "delete": {
            "type": "lambda",
            "methods": [
              "DELETE"
            ],
            "source": "DeepProdPropertyDelete585a3b99",
            "region": "us-east-1"
          },
          "update": {
            "type": "lambda",
            "methods": [
              "PUT"
            ],
            "source": "DeepProdPropertyUpdate585a3b99",
            "region": "us-east-1"
          }
        },
        "property-counts": {
          "retrieve": {
            "type": "lambda",
            "methods": [
              "GET"
            ],
            "source": "DeepProdPropertyCountsRetrieve585a3b99",
            "region": "us-east-1"
          }
        }
      }
    }
  },
  "globals": {
    "logDrivers": {
      "sentry": {
        "dns": "https://905e3e7244fe432993751cb500b56b4d:3527453acb2c47bf9aa66707c65cc31d@app.getsentry.com/48093"
      }
    },
    "userProviderEndpoint": "@deep.mg.auth:user-retrieve",
    "security": {
      "identityProviders": {
        "www.amazon.com": "amzn1.application.12057697ba3347cda73dd9f6d3b9ce2b"
      }
    }
  },
  "microserviceIdentifier": "deep.mg.auth",
  "awsAccountId": 722084099005,
  "propertyIdentifier": "deep.mg.prod",
  "timestamp": 1441198970148,
  "buckets": {
    "public": {
      "name": "deep.prod.public.db0c09cc"
    },
    "temp": {
      "name": "deep.prod.temp.db0c09cc"
    },
    "system": {
      "name": "deep.prod.system.db0c09cc"
    }
  },
  "tablesNames": {
    "Account": "DeepProdAccountdb0c09cc",
    "ActivityLog": "DeepProdActivityLogdb0c09cc",
    "Role": "DeepProdRoledb0c09cc",
    "User": "DeepProdUserdb0c09cc",
    "Billing": "DeepProdBillingdb0c09cc",
    "Property": "DeepProdPropertydb0c09cc"
  }
}, function(){});
