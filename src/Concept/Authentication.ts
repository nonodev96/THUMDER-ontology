import Concept from "../_Core/content/Concept";

export default abstract class Authentication implements Concept {}

export class AuthenticationToken extends Authentication {}
