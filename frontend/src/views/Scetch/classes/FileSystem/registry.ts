import { Base, BaseStatic } from "./base.js";

const registry = new Map<string, BaseStatic>();

/**
 * Register a concrete `Base` implementation so `deserialize`/`deserializeString`
 * can reconstruct it by its `type` discriminator. Called once per class, at
 * the bottom of that class's module.
 */
export function registerType(ctor: BaseStatic): void {
  registry.set(ctor.type, ctor);
}

/** Deserialize a single already-parsed JSON object using its `type` field. */
export function deserialize(json: unknown): Base {
  if (typeof json !== "object" || json === null || !("type" in json)) {
    throw new Error("Cannot deserialize: value is not a tagged Base object");
  }
  const type = (json as { type: unknown }).type;
  if (typeof type !== "string") {
    throw new Error("Cannot deserialize: missing string 'type' field");
  }
  const ctor = registry.get(type);
  if (!ctor) {
    throw new Error(`Cannot deserialize: unknown type "${type}"`);
  }
  return ctor.fromString(JSON.stringify(json));
}

/** Convenience wrapper: deserialize directly from a JSON string. */
export function deserializeString(str: string): Base {
  return deserialize(JSON.parse(str));
}
