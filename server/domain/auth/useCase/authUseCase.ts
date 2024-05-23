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

import jwt from 'jsonwebtoken';

export const authUseCase = {
  initiateAuth: (entity: initiateAuthEntity): initiateAuthResponse => {
    // mock response
    console.log('initiateAuth', entity);
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
    console.log('authChallenge', entity);
    return {
      AuthenticationResult: {
        AccessToken: jwt.sign({ email: 'example@example.com' }, secret, { expiresIn: '3600' }),
        ExpiresIn: 3600,
        IdToken: jwt.sign({ sub: 'sub' }, secret, { expiresIn: '3600' }),
        RefreshToken: jwt.sign({ sub: 'sub' }, secret, { expiresIn: '3600' }),
        TokenType: 'Bearer',
      },
      ChallengeParameters: [],
      Session: 'session',
    };
  },

  getId: (entity: getIdEntity): getIdResponse => {
    // mock response
    console.log('getId', entity);
    return {
      IdentityId: 'identityId',
    };
  },

  getCredentialsForIdentity: (
    entity: getCredentialsForIdentityEntity,
  ): getCredentialsForIdentityResponse => {
    // mock response
    console.log('getCredentialsForIdentity', entity);
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
    console.log('getuser', entity);
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
