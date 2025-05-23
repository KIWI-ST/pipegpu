import type { Context } from "../Context";
import type { FrameStageFormat, TypedArray1DFormat } from "../Format";
import { BaseTexture } from "./BaseTexture";

/**
 * 
 */
class Texture2D extends BaseTexture {
    /**
     * 
     */
    private textureData?: TypedArray1DFormat;

    /**
     * 
     * @param opts 
     */
    constructor(
        opts: {
            id: number,
            ctx: Context,
            width: number,
            height: number,
            appendixTextureUsages?: number,
            textureData?: TypedArray1DFormat,
            textureFormat?: GPUTextureFormat,
            maxMipLevel?: number
        }
    ) {
        super({
            id: opts.id,
            ctx: opts.ctx,
            width: opts.width,
            height: opts.height,
            depthOrArrayLayers: 1,
            textureUsageFlags: (opts.appendixTextureUsages || 0) | GPUTextureUsage.COPY_DST | GPUTextureUsage.TEXTURE_BINDING,
            textureFormat: opts.textureFormat,
            maxMipLevel: opts.maxMipLevel,
            propertyFormat: 'texture2D'
        });
        this.textureData = opts.textureData;
    }

    /**
     * 
     */
    protected override createGpuTexture(): void {
        const desc: GPUTextureDescriptor = {
            size: this.extent3d,
            format: this.textureFormat,
            usage: this.textureUsageFlags
        };
        // write texture
        this.texture = this.ctx.getGpuDevice().createTexture(desc);
        const destination: GPUTexelCopyTextureInfo = {
            texture: this.texture
        };
        // depth texture not allow texture write from cpu as default.
        if (this.textureData && !this.isDetphTexture()) {
            const dataLayout: GPUTexelCopyBufferLayout = {};
            this.ctx.getGpuQueue().writeTexture(destination, this.textureData, dataLayout, this.extent3d);
        }
    }

    /**
     * 
     * @param encoder 
     * @param frameStage 
     */
    override getGpuTexture = (_encoder: GPUCommandEncoder, _frameStage: FrameStageFormat): GPUTexture => {
        if (!this.texture) {
            this.createGpuTexture();
        }
        return this.texture as GPUTexture;
    }

    /**
     * 
     * @returns 
     */
    override getGpuTextureView = (): GPUTextureView => {
        if (this.textureViews.length === 0) {
            this.createGpuTextureViews();
        }
        return this.textureViews[this.mipCurosr];
    }
}

export {
    Texture2D
}