export type initiateAuthEntity = {
  AuthFlow: string;
  AuthParameters: {
    SRP_A: string;
    USERNAME: string;
  };
  ClientId: string;
};

export type initiateAuthResponse = {
  ChallengeName: string;
  ChallengeParameters: {
    SALT: string;
    SECRET_BLOCK: string;
    SRP_B: string;
    USERNAME: string;
    USER_ID_FOR_SRP: string;
  };
};

export type respondToAuthChallengeEntity = {
  ChallengeName: string;
  ChallengeResponses: {
    PASSWORD_CLAIM_SECRET_BLOCK: string;
    PASSWORD_CLAIM_SIGNATURE: string;
    TIMESTAMP: string;
    USERNAME: string;
  };
  ClientId: string;
};

export type respondToAuthChallengeResponse = {
  AuthenticationResult: {
    AccessToken: string;
    ExpiresIn: number;
    IdToken: string;
    RefreshToken: string;
    TokenType: string;
  };
  ChallengeParameters: [];
  Session: string;
};

export type getIdEntity = {
  IdentityPoolId: string;
  Logins: {
    [key: string]: string;
  };
};

export type getIdResponse = {
  IdentityId: string;
};

export type getCredentialsForIdentityEntity = {
  IdentityId: string;
  Logins: {
    [key: string]: string;
  };
};

export type getCredentialsForIdentityResponse = {
  Credentials: {
    AccessKeyId: string;
    Expiration: number;
    SecretKey: string;
    SessionToken: string;
  };
  IdentityId: string;
};

export type getUserEntity = {
  AccessToken: string;
};

export type getUserResponse = {
  UserAttributes: {
    Name: string;
    Value: string;
  }[];
  Username: string;
};
