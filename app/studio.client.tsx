import {codeInput} from '@sanity/code-input'
import {defaultTheme} from '@sanity/ui/theme'
import {visionTool} from '@sanity/vision'
import {ReactElement, Suspense, useMemo} from 'react'
import {defineConfig, SingleWorkspace, Studio} from 'sanity'
import {deskTool} from 'sanity/desk'
import {presentationTool} from 'sanity/presentation'

import {schema} from '~/sanity/schema'
import {StudioLogo} from '~/sanity/studio'

export default function RemixStudio(props: {
  basePath: string
  dataset: string
  projectId: string
}): ReactElement {
  const {basePath, dataset, projectId} = props

  const config = useMemo(
    () =>
      defineConfig<SingleWorkspace>({
        basePath,
        projectId,
        dataset,
        title: 'Sanity Design',
        plugins: [
          codeInput(),
          deskTool(),
          presentationTool({
            previewUrl: {
              draftMode: {
                check: '/preview/check',
                disable: '/preview/disable',
                enable: '/preview/enable',
              },
              origin: 'http://localhost:3000',
            },
          }),
          visionTool(),
        ],
        schema,
        studio: {
          components: {
            logo: StudioLogo,
          },
        },
        theme: defaultTheme,
      }),
    [basePath, dataset, projectId],
  )

  return (
    <Suspense>
      <Studio config={config} />
    </Suspense>
  )
}
