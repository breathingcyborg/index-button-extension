import { useState } from "react";
import { ImportUrlsForm } from "./import-urls-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { CodeXmlIcon, LinkIcon } from "lucide-react";
import { ImportSitemapForm } from "./import-sitemap-form";

type Source = 'urls' | 'sitemap'

export function AddPagesForm({
    onSuccess
}: {
    onSuccess: () => void | Promise<void>
}) {
    const [source, setSource] = useState<Source | null>(null);

    const sourceOptions = [
        { title: 'Page List', description: 'Choose this if you have list of page urls.', icon: LinkIcon, value: 'urls' },
        { title: 'Sitemap', description: 'Choose this if you have sitemap url.', icon: CodeXmlIcon, value: 'sitemap' },
    ]

    if (!source) {
        return <RadioGroup
            value={source || ''}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onValueChange={(v) => {
                setSource(v as Source || null);
            }}
        >
            {
                sourceOptions.map(option => (
                    <div>
                        <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
                        <Label
                            htmlFor={option.value}
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <option.icon 
                                className="mb-4 h-6 w-6"
                            />
                            <span className="mb-3">
                                { option.title }
                            </span>
                            <span className="text-balance text-center text-foreground/50 px-2">
                                { option.description }
                            </span>
                        </Label>
                    </div>
                ))
            }
        </RadioGroup>
    }

    if (source === 'urls') {
        return <ImportUrlsForm onSuccess={onSuccess} />
    }

    if (source === 'sitemap') {
        return <ImportSitemapForm onSuccess={onSuccess} />
    }

    return <div>
        TODO: handle {source}
    </div>
}