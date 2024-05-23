import { authUseCase } from 'domain/auth/useCase/authUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: ({ body, headers }): { status: number; body: string } => {
    if (!headers['x-amz-target']) return { status: 400, body: 'Bad Request' };
    const operation = headers['x-amz-target'].split('.')[1];
    switch (operation) {
      case 'InitiateAuth':
        return {
          status: 200,
          body: JSON.stringify(authUseCase.initiateAuth(body)),
        };

      case 'RespondToAuthChallenge':
        return {
          status: 200,
          body: JSON.stringify(authUseCase.authChallenge(body)),
        };

      case 'GetId':
        return {
          status: 200,
          body: JSON.stringify(authUseCase.getId(body)),
        };

      case 'GetCredentialsForIdentity':
        return {
          status: 200,
          body: JSON.stringify(authUseCase.getCredentialsForIdentity(body)),
        };

      case 'GetUser':
        return {
          status: 200,
          body: JSON.stringify(authUseCase.getUser(body)),
        };

      default:
        return {
          status: 400,
          body: 'Bad Request',
        };
    }
  },
}));
