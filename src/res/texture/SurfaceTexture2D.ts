import type { Context } from "../Context";
import type { FrameStageFormat } from "../Format";
import { BaseTexture } from "./BaseTexture";

/**
 * 
 */
class SurfaceTexture2D extends BaseTexture {
    /**
     * 
     * @param opts 
     */
    constructor(
        opts: {
            id: number,
            ctx: Context,
            appendixTextureUsages?: number,
        }
    ) {
        super({
            id: opts.id,
            ctx: opts.ctx,
            width: opts.ctx.getViewportWidth(),
            height: opts.ctx.getViewportHeight(),
            textureUsageFlags: (opts.appendixTextureUsages || 0) | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
            propertyFormat: 'texture2D',
            textureFormat: opts.ctx.getPreferredTextureFormat(),
        });
    }

    /**
     * 
     */
    protected override createGpuTexture(): void {
        this.texture = this.ctx.getFrameTexture();
    }

    /**
     * surface texture do nothing.
     */
    override getGpuTextureView = (): GPUTextureView => {
        return this.ctx.getFrameTextureView();
    }

    /**
     * 
     * @param encoder 
     * @param frameStage 
     */
    override getGpuTexture = (_encoder: GPUCommandEncoder | null = null, _frameStage: FrameStageFormat = 'frameBegin'): GPUTexture => {
        this.createGpuTexture();
        return this.texture as GPUTexture;
    }
}

export {
    SurfaceTexture2D
}