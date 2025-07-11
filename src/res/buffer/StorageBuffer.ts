import { type Context } from "../Context";
import { type TypedArray2DFormat } from "../Format";
import { type Handle2D } from "./BaseBuffer";
import { Buffer2D } from "./Buffer2D";

/**
 * 
 * @class StorageBuffer
 * 
 */
class StorageBuffer extends Buffer2D {

    /**
     * 
     * @param {number}              opts.id
     * @param {Context}             opts.ctx
     * @param {number}              opts.totalByteLength
     * @param {GPUBufferUsageFlags} opts.bufferUsageFlags
     * @param {TypedArray2DFormat}  opts.typedArrayData2D
     * @param {Handle2D}            opts.handler
     * 
     */
    constructor(
        opts: {
            id: number,
            ctx: Context,
            totalByteLength: number,
            bufferUsageFlags?: GPUBufferUsageFlags
            typedArrayData2D?: TypedArray2DFormat,
            handler?: Handle2D
        }
    ) {
        super({
            id: opts.id,
            ctx: opts.ctx,
            totalByteLength: opts.totalByteLength,
            bufferUsageFlags: opts.bufferUsageFlags || GPUBufferUsage.STORAGE | GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
            typedArrayData2D: opts.typedArrayData2D,
            handler: opts.handler
        });
    }

}

export {
    StorageBuffer
}