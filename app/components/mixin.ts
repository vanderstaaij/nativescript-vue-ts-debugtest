import { FB } from "~/enums";

export const mixin = {
    methods: {
        bar: () => {
            console.log(FB.bar);
        }
    }
};