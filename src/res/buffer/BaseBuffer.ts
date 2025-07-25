import { Context } from "../Context.ts"
import type { FrameStageFormat, TypedArray1DFormat } from "../Format.ts";

/**
 * e.g for vertex / index / unfiorm buffer.
 * rewrite buffer
 */
type Handle1D = () => {
    rewrite: boolean,
    detail: {
        offset: number,
        size: number,
        byteLength: number,
        rawData: TypedArray1DFormat | ArrayBuffer
    }
};

/**
 * e.g for storage buffer.
 */
type Handle2D = () => {
    rewrite: boolean,
    details: Array<{
        offset: number,
        size: number,
        byteLength: number,
        rawData: TypedArray1DFormat | ArrayBuffer
    }>
};

/**
 * 
 */
abstract class BaseBuffer {

    /**
    *
    */
    private id: number;

    /**
     * 
     */
    protected ctx: Context | undefined;

    /**
     * 
     */
    protected bufferUsageFlags: GPUBufferUsageFlags;

    /**
     * 
     */
    protected buffer!: GPUBuffer;

    /**
    * 
    */
    protected totalByteLength: number = 0;

    /**
     * 
     */
    constructor(
        opts: {
            id: number,
            ctx: Context,
            bufferUsageFlags: GPUBufferUsageFlags,
            totalByteLength: number,
        }
    ) {
        this.id = opts.id;
        this.ctx = opts.ctx;
        this.bufferUsageFlags = opts.bufferUsageFlags;
        this.totalByteLength = opts.totalByteLength;
        if (!this.totalByteLength) {
            throw new Error(`[E][BaseBuffer][constructor] create buffer error, opts.totalByteLength value invalid.`);
        }
    }

    /**
     * 
     * @returns 
     */
    getID = (): number => {
        return this.id;
    }

    /**
     * @returns {number} buffer total byte length.
     */
    getByteLength = (): number => {
        return this.totalByteLength;
    }

    /**
     * 
     * @param encoder 
     * @param frameStage 
     */
    abstract getGpuBuffer(encoder: GPUCommandEncoder | null, frameStage: FrameStageFormat): GPUBuffer;

}

export {
    type Handle1D,
    type Handle2D,
    BaseBuffer
}