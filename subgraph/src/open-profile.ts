import { TagAdded as TagAddedEvent } from "../generated/OpenProfile/OpenProfile"
import { TagAdded } from "../generated/schema"

export function handleTagAdded(event: TagAddedEvent): void {
  let entity = new TagAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.profile = event.params.profile
  entity.app = event.params.app
  entity.tag = event.params.tag

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
