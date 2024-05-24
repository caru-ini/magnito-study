import type {
  getCredentialsForIdentityEntity,
  getCredentialsForIdentityResponse,
  getIdEntity,
  getIdResponse,
  getUserResponse,
  initiateAuthEntity,
  initiateAuthResponse,
  respondToAuthChallengeEntity,
  respondToAuthChallengeResponse,
} from 'api/@types/auth';
import { randomUUID } from 'crypto';

import jwt from 'jsonwebtoken';

const getFakeAccessToken = (): string =>
  jwt.sign(
    {
      sub: randomUUID(),
      iss: 'http://localhost:3000',
      client_id: 'client_id',
      origin_jti: 'origin_jti',
      event_id: 'event_id',
      token_use: 'access',
      scope: 'aws.cognito.signin.user.admin',
      auth_time: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
      jti: 'jti',
      username: 'test',
    },
    'secret',
  );

const getFakeIdToken = (): string =>
  jwt.sign(
    {
      sub: randomUUID(),
      email_verified: true,
      iss: 'http://localhost:3000',
      'cognito:username': 'test',
      aud: 'client_id',
      event_id: 'event_id',
      token_use: 'id',
      auth_time: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
      jti: 'jti',
      email: 'example@example.com',
    },
    'secret',
  );
export const authUseCase = {
  initiateAuth: (entity: initiateAuthEntity): initiateAuthResponse => {
    // mock response
    return {
      ChallengeName: 'PASSWORD_VERIFIER',
      ChallengeParameters: {
        SALT: 'salt',
        SECRET_BLOCK: 'secretBlock',
        SRP_B: 'srpB',
        USERNAME: 'username',
        USER_ID_FOR_SRP: 'userIdForSrp',
      },
    };
  },

  authChallenge: (entity: respondToAuthChallengeEntity): respondToAuthChallengeResponse => {
    // mock response
    const secret = 'secret';
    return {
      AuthenticationResult: {
        AccessToken: getFakeAccessToken(),
        ExpiresIn: 3600,
        IdToken: getFakeIdToken(),
        RefreshToken: jwt.sign({ sub: 'sub' }, secret, { expiresIn: '3600' }),
        TokenType: 'Bearer',
      },
      ChallengeParameters: [],
      Session: 'session',
    };
  },

  getId: (entity: getIdEntity): getIdResponse => {
    // mock response
    return {
      IdentityId: 'identityId',
    };
  },

  getCredentialsForIdentity: (
    entity: getCredentialsForIdentityEntity,
  ): getCredentialsForIdentityResponse => {
    // mock response
    return {
      Credentials: {
        AccessKeyId: 'ASIA',
        Expiration: 3600,
        SecretKey: jwt.sign({ sub: 'sub' }, 'secret', {
          expiresIn: '3600',
        }),
        SessionToken: jwt.sign({ sub: 'sub' }, 'secret', {
          expiresIn: '3600',
        }),
      },
      IdentityId: 'identityId',
    };
  },

  getUser: (entity: { AccessToken: string }): getUserResponse => {
    // mock response
    return {
      UserAttributes: [
        { Name: 'email', Value: 'example@example.com' },
        { Name: 'email_verified', Value: 'true' },
        { Name: 'sub', Value: 'sub' },
      ],
      Username: 'username',
    };
  },
};
