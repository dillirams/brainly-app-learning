type Size="sm"|"md"
export interface IconInput{
    size:Size
    onClick?:()=>void
}
export const sizeStyle={
    "md":"size-10",
    "sm":"size-6"
}