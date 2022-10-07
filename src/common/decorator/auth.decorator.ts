import { SetMetadata } from '@nestjs/common'
import {
  AUTHORIZE_KEY_METADATA,
  PERMISSION_OPTIONAL_KEY_METADATA,
} from '../constant/auth.constant'

/**
 * 开放api，无需token和权限
 */
export const Authorize = () => SetMetadata(AUTHORIZE_KEY_METADATA, true)

/**
 * 开放api，无需权限但是需要token
 */
export const PermissionOptional = () =>
  SetMetadata(PERMISSION_OPTIONAL_KEY_METADATA, true)
