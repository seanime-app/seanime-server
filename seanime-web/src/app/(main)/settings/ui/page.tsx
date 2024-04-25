"use client"
import { useUpdateTheme } from "@/api/hooks/theme.hooks"
import { PageWrapper } from "@/components/shared/page-wrapper"
import { IconButton } from "@/components/ui/button"
import { cn } from "@/components/ui/core/styling"
import { defineSchema, Field, Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { THEME_DEFAULT_VALUES, ThemeLibraryScreenBannerType, useThemeSettings } from "@/lib/theme/hooks"
import Link from "next/link"
import React from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"

const themeSchema = defineSchema(({ z }) => z.object({
    animeEntryScreenLayout: z.string().min(0).default(THEME_DEFAULT_VALUES.animeEntryScreenLayout),
    smallerEpisodeCarouselSize: z.boolean().default(THEME_DEFAULT_VALUES.smallerEpisodeCarouselSize),
    expandSidebarOnHover: z.boolean().default(THEME_DEFAULT_VALUES.expandSidebarOnHover),
    backgroundColor: z.string().min(0).default(THEME_DEFAULT_VALUES.backgroundColor),
    sidebarBackgroundColor: z.string().min(0).default(THEME_DEFAULT_VALUES.sidebarBackgroundColor),

    libraryScreenBannerType: z.string().default(THEME_DEFAULT_VALUES.libraryScreenBannerType),
    libraryScreenCustomBannerImage: z.string().default(THEME_DEFAULT_VALUES.libraryScreenCustomBannerImage),
    libraryScreenCustomBannerPosition: z.string().default(THEME_DEFAULT_VALUES.libraryScreenCustomBannerPosition),
    libraryScreenCustomBannerOpacity: z.number().transform(v => v === 0 ? 100 : v).default(THEME_DEFAULT_VALUES.libraryScreenCustomBannerOpacity),
    libraryScreenCustomBackgroundImage: z.string().default(THEME_DEFAULT_VALUES.libraryScreenCustomBackgroundImage),
    libraryScreenCustomBackgroundOpacity: z.number()
        .transform(v => v === 0 ? 100 : v)
        .default(THEME_DEFAULT_VALUES.libraryScreenCustomBackgroundOpacity),
}))

export const dynamic = "force-static"

export default function Page() {
    const themeSettings = useThemeSettings()

    const { mutate, isPending } = useUpdateTheme()

    return (
        <PageWrapper className="p-4 sm:p-8 space-y-4">
            <div className="flex gap-4 items-center">
                <Link href={`/settings`}>
                    <IconButton icon={<AiOutlineArrowLeft />} rounded intent="white-outline" size="sm" />
                </Link>
                <div className="space-y-1">
                    <h2>User Interface</h2>
                    <p className="text-[--muted]">
                        Change the user interface settings
                    </p>
                </div>
            </div>

            <p>
                Images should be in a directory configurable in your <code>config.toml</code> file.
            </p>

            <Separator />
            <Form
                schema={themeSchema}
                onSubmit={data => {
                    mutate({
                        theme: {
                            id: 0,
                            ...themeSettings,
                            ...data,
                        },
                    })
                }}
                defaultValues={{
                    animeEntryScreenLayout: themeSettings?.animeEntryScreenLayout,
                    smallerEpisodeCarouselSize: themeSettings?.smallerEpisodeCarouselSize,
                    expandSidebarOnHover: themeSettings?.expandSidebarOnHover,
                    backgroundColor: themeSettings?.backgroundColor,
                    sidebarBackgroundColor: themeSettings?.sidebarBackgroundColor,
                    libraryScreenBannerType: themeSettings?.libraryScreenBannerType,
                    libraryScreenCustomBannerImage: themeSettings?.libraryScreenCustomBannerImage,
                    libraryScreenCustomBannerPosition: themeSettings?.libraryScreenCustomBannerPosition,
                    libraryScreenCustomBannerOpacity: themeSettings?.libraryScreenCustomBannerOpacity,
                    libraryScreenCustomBackgroundImage: themeSettings?.libraryScreenCustomBackgroundImage,
                    libraryScreenCustomBackgroundOpacity: themeSettings?.libraryScreenCustomBackgroundOpacity,
                }}
                stackClass="space-y-4"
            >
                {(f) => (
                    <>
                        <h3>Main</h3>

                        <div className="flex flex-col md:flex-row gap-3">
                            {/*<div className="flex flex-col md:flex-row gap-4 w-full">*/}
                            {/*    <Field.ColorPicker*/}
                            {/*        name="backgroundColor"*/}
                            {/*        label="Background color"*/}
                            {/*        help="Default: #0c0c0c"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <Field.Text
                                label="Background image path"
                                name="libraryScreenCustomBackgroundImage"
                                placeholder="e.g., image.png"
                                help="This will be used as the background image for the library page."
                            />

                            <Field.Number
                                label="Background image opacity"
                                name="libraryScreenCustomBackgroundOpacity"
                                placeholder="Default: 10"
                                min={1}
                                max={100}
                            />
                        </div>
                        <h3>Sidebar</h3>

                        <Field.Switch
                            label="Expand sidebar on hover"
                            name="expandSidebarOnHover"
                        />

                        <Separator />

                        <h3>Library page</h3>

                        <h5>Continue Watching</h5>

                        <Field.Switch
                            label="Smaller episode carousel size"
                            name="smallerEpisodeCarouselSize"
                        />

                        <h5>Banner</h5>

                        <Field.RadioCards
                            label="Banner type"
                            name="libraryScreenBannerType"
                            options={[
                                {
                                    label: "Dynamic Banner",
                                    value: "dynamic",
                                },
                                {
                                    label: "Custom Banner",
                                    value: "custom",
                                },
                                {
                                    label: "None",
                                    value: "none",
                                },
                            ]}
                            itemContainerClass={cn(
                                "items-start w-fit cursor-pointer transition border-transparent rounded-[--radius] p-4",
                                "bg-gray-50 hover:bg-[--subtle] dark:bg-gray-900",
                                "data-[state=checked]:bg-white dark:data-[state=checked]:bg-gray-950",
                                "focus:ring-2 ring-brand-100 dark:ring-brand-900 ring-offset-1 ring-offset-[--background] focus-within:ring-2 transition",
                                "border border-transparent data-[state=checked]:border-[--brand] data-[state=checked]:ring-offset-0",
                            )}
                        />

                        {f.watch("libraryScreenBannerType") === ThemeLibraryScreenBannerType.Custom && (
                            <div className="flex flex-col md:flex-row gap-3">
                                <Field.Text
                                    label="Custom banner image path"
                                    name="libraryScreenCustomBannerImage"
                                    placeholder="e.g., image.gif"
                                />
                                <Field.Text
                                    label="Custom banner position"
                                    name="libraryScreenCustomBannerPosition"
                                    placeholder="Default: 50% 50%"
                                />
                                <Field.Number
                                    label="Custom banner Opacity"
                                    name="libraryScreenCustomBannerOpacity"
                                    placeholder="Default: 10"
                                    min={1}
                                    max={100}
                                />
                            </div>
                        )}

                        <div className="mt-4">
                            <Field.Submit role="save" loading={isPending}>Save</Field.Submit>
                        </div>
                    </>
                )}
            </Form>
        </PageWrapper>
    )

}
