/**
 * Generated by @openapi-codegen
 *
 * @version 0.1.0
 */
export type BodyLoginForAccessTokenTokenPost = {
  grant_type?: string | null
  username: string
  password: string
  /**
   * @default
   */
  scope?: string
  client_id?: string | null
  client_secret?: string | null
}

export type HTTPValidationError = {
  detail?: ValidationError[]
}

export type InquiryDTO = {
  query: string
  context: string
}

export type SearchRequestDTO = {
  query: string
}

export type Token = {
  access_token: string
  token_type: string
}

export type User = {
  username: string
  email?: string | null
  full_name?: string | null
  disabled?: boolean | null
}

export type ValidationError = {
  loc: (string | number)[]
  msg: string
  type: string
}
