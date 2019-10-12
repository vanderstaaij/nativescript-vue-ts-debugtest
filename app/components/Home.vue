<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Home"></Label>
        </ActionBar>

        <StackLayout>
            <Label class="info" horizontalAlignment="center" verticalAlignment="center">
                <FormattedString>
                    <Span class="fa" text.decode="&#xf135; "/>
                    <Span :text="message"/>
                </FormattedString>
            </Label>
            <Button @onTap="foo" text="foo" />
            <Button @onTap="bar" text="bar" />
        </StackLayout>
    </Page>
</template>

<script lang="ts">

    import { FB } from "~/enums";
    import { mixin } from "./mixin";

    export default {
        mixins: [ mixin ],
        computed: {
            message() {
                return "Blank {N}-Vue app";
            }
        },
        methods: {
            foo : () => {
                debugger;
                console.log(FB.foo);
                debugger;
            }
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
    .fa {
        color: $accent-dark;
    }

    .info {
        font-size: 20;
    }
</style>
