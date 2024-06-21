import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { TagAdded } from "../generated/OpenProfile/OpenProfile"

export function createTagAddedEvent(
  profile: Address,
  app: string,
  tag: string
): TagAdded {
  let tagAddedEvent = changetype<TagAdded>(newMockEvent())

  tagAddedEvent.parameters = new Array()

  tagAddedEvent.parameters.push(
    new ethereum.EventParam("profile", ethereum.Value.fromAddress(profile))
  )
  tagAddedEvent.parameters.push(
    new ethereum.EventParam("app", ethereum.Value.fromString(app))
  )
  tagAddedEvent.parameters.push(
    new ethereum.EventParam("tag", ethereum.Value.fromString(tag))
  )

  return tagAddedEvent
}
