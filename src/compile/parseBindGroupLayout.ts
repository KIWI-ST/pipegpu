import type { Context } from "../res/Context"

/**
 * 
 * @param ctx 
 * @param collectedBindgroupLayoutEntriesMap 
 * @param bindGroupLayouts 
 * @param gourpIDWithBindGroupLayoutMap 
 * @param gourpIDWithBindGroupLayoutDescriptorMap 
 */
const parseBindGroupLayout = (
    ctx: Context,
    collectedBindgroupLayoutEntriesMap: Map<number, GPUBindGroupLayoutEntry[]>,
    bindGroupLayouts: GPUBindGroupLayout[],
    gourpIDWithBindGroupLayoutMap: Map<number, GPUBindGroupLayout>,
    gourpIDWithBindGroupLayoutDescriptorMap: Map<number, GPUBindGroupLayoutDescriptor>
) => {
    const maxBindGroups = ctx.getLimits().maxBindGroups;
    for (let groupID = 0; groupID < maxBindGroups; groupID++) {
        if (collectedBindgroupLayoutEntriesMap.has(groupID)) {
            const entries: GPUBindGroupLayoutEntry[] = collectedBindgroupLayoutEntriesMap.get(groupID) as GPUBindGroupLayoutEntry[];
            const bindGropuLayoutDescriptor: GPUBindGroupLayoutDescriptor = {
                label: `gourp_${groupID}`,
                entries: [...entries]
            };
            // BUG? after createBindGroupLayout, bindGropuLayoutDescriptor.entires has been clear?
            const bindGroupLayout: GPUBindGroupLayout = ctx.getGpuDevice().createBindGroupLayout(bindGropuLayoutDescriptor);
            bindGroupLayouts.push(bindGroupLayout);
            gourpIDWithBindGroupLayoutMap.set(groupID, bindGroupLayout);
            gourpIDWithBindGroupLayoutDescriptorMap.set(groupID, bindGropuLayoutDescriptor);
        }
    }
}

export {
    parseBindGroupLayout
}