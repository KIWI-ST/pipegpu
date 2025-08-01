import type { Uniforms } from "../../property/Properties";
import { reflectShaderUniforms } from "../../util/reflectShaderUniforms";
import type { Context } from "../Context";
import { BaseShader } from "./BaseShader";

/**
 * 
 */
class ComputeShader extends BaseShader {

    /**
     * 
     * @param opts 
     */
    constructor(
        opts: {
            ctx: Context,
            code: string,
            entryPoint: string
        }
    ) {
        super({
            ctx: opts.ctx,
            code: opts.code,
            entryPoint: opts.entryPoint,
            shaderStage: GPUShaderStage.COMPUTE
        });
    }

    /**
     * 
     */
    public override reflect = (uniforms?: Uniforms): void => {
        this.createGpuShader(`[ComputeShader][ID][${this.getID()}]`);
        this.reflectedUniforms = reflectShaderUniforms(this.code, this.entryPoint, this.shaderStage, uniforms);
    }

}

export {
    ComputeShader
}