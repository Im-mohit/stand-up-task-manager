import { Stack } from "aws-cdk-lib/core"
import { EmailIdentity } from "aws-cdk-lib/aws-ses"
import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';

const backend = defineBackend({})

backend.addOutput({
    auth: {
        user_pool_id: "ap-south-1_fAMrLFaIb",
        aws_region: "ap-south-1",
        user_pool_client_id: "22pe4uk24jmkt3ik1st0uutpc2",
        identity_pool_id: "ap-south-1:14b27edf-ff89-46c1-ac95-e47c7b0efde9",
        standard_required_attributes: [
            "email"
        ],
        username_attributes: [
            "email"
        ],
        user_verification_types: [
            "email"
        ],
        password_policy: {
            min_length: 8,
            require_numbers: true,
            require_lowercase: true,
            require_uppercase: true,
            require_symbols: true
        },
        oauth: {
            identity_providers: [
                "GOOGLE"
            ],
            redirect_sign_in_uri: [
            "http://localhost:3002",
            "http://localhost:3001",
            "https://leanlyf.com",
            "https://standupmate.leanlyf.com"
            ],
            redirect_sign_out_uri: [
            "http://localhost:3002",
            "http://localhost:3001",
            "https://leanlyf.com",
            "https://standupmate.leanlyf.com"
            ],
            response_type: "code",
            scopes: [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
          ],
            domain: "69815d0d91e3b361393b.auth.ap-south-1.amazoncognito.com"
        },
        unauthenticated_identities_enabled: true
  }
  })