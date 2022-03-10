export const addMetadataResponse = {
  'error': false,
  'code': 200,
  'data': {
    'tokenId': 1
  },
  'message': 'Successful'
};

export const tokenExistsErrorResponse = {
  'error': true,
  'code': 403,
  'message': 'Token must have been deleted before you can insert'
};

export const metadataNotFoundResponse = {
  'error': true,
  'code': 404,
  'message': 'Token metadata was not found'
};

export const updateMetadataResponse = {
  'error': false,
  'code': 200,
  'data': {
    'tokenId': 1
  },
  'message': 'Successful'
};
