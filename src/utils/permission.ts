import { check, Permission, request, RESULTS } from 'react-native-permissions';

export const CheckPermission = (permission: Permission) => {
  return check(permission).then((result) => {
    switch (result) {
      case RESULTS.LIMITED:
      case RESULTS.DENIED:
        request(permission);
        break;
    }
  });
};
