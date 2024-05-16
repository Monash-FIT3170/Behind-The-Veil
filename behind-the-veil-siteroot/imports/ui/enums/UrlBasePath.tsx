/**
 * File Description: URL base levels enum
 * File version: 1.0
 * Contributors: Nikki
 */

/**
 * An enum of all variables that track the base level URL of the website such as "services", "artists", "login", etc.
 */
export enum UrlBasePath {
    EXAMPLES= "examples",
    HOME = "",
    LOGIN = "login",
    REGISTER = "register",
    FORGOT_PASSWORD = "forgot-password",
    RESET_PASSWORD = "reset-password",
    SERVICES = "services",
    // todo: might reroute profiles to be the same page but display different things
    ARTISTS = "artists",
    ARTIST_PROFILE = "artist-profile",
    BRIDE_PROFILE = "bride-profile",
    MESSAGES = "messages"
}

export default UrlBasePath;