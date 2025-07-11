import type { RenderProperty } from "../property/dispatch/RenderProperty"
import type { IndexBuffer } from "../res/buffer/IndexBuffer";
import type { PropertyFormat } from "../res/Format";
import type { RenderHandle } from "../res/Handle";
import type { BufferState } from "../state/BufferState";

/**
 * 
 * @param bufferState 
 * @param dispatch 
 * @param _handler 
 */
const parseRenderDispatch = (
    bufferState: BufferState,
    dispatch: RenderProperty,
): RenderHandle => {
    if (!dispatch) {
        throw new Error(`[E][parseRenderDispatch] missing render 'dispatch' in 'RenderHolderDesc'`)
    }
    const t: PropertyFormat = dispatch.getPropertyFormat();
    switch (t) {
        case 'drawCount':
            {
                return (encoder: GPURenderPassEncoder): void => {
                    const maxDrawCount: number = dispatch.getMaxDrawCount();
                    const instanceCount: number = dispatch.getInstanceCount();
                    encoder.draw(maxDrawCount, instanceCount);
                };
            }
        case 'drawIndexed':
            {
                return (encoder: GPURenderPassEncoder): void => {
                    const indexBufferID: number = dispatch.getIndexBufferID();
                    const indexBuffer: IndexBuffer = bufferState.getBuffer(indexBufferID) as IndexBuffer;
                    const instanceCount: number = dispatch.getInstanceCount();
                    encoder.setIndexBuffer(indexBuffer.getGpuBuffer(), indexBuffer.getIndexFormat());
                    encoder.drawIndexed(indexBuffer.getDrawCount(), instanceCount, 0, 0, 0);
                };
            }
        default:
            {
                throw new Error(`[E][parseRenderDispatch] unsupport render dispatch type:${t} in render 'RenderHolderDesc'`)
            }
    }
}

export {
    parseRenderDispatch
}