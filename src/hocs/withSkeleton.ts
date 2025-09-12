// withSkeleton.ts - Enhanced Higher Order Component for Vue skeleton loading
import {
    h,
    ref,
    onMounted,
    nextTick,
    type Component,

    type VNode,
    type PropType,
    type SetupContext,
} from 'vue';

// Type definitions
interface SkeletonElement {
    width: string;
    height: string;
    marginBottom?: string;
    marginTop?: string;
    marginLeft?: string;
    marginRight?: string;
    borderRadius?: string;
    type:
        | 'text'
        | 'image'
        | 'button'
        | 'input'
        | 'block'
        | 'badge'
        | 'rating'
        | 'price'
        | 'circle';
    backgroundColor?: string;
    className?: string;
    styles?: Record<string, string>;
}

interface SkeletonOptions {
    skeletonClass?: string;
    containerClass?: string;
    animationDuration?: string;
    backgroundColor?: string;
    highlightColor?: string;
    borderRadius?: string;
    autoDetect?: boolean;
    customLayout?: SkeletonElement[];
    detectFromProps?: boolean;
    containerStyles?: Record<string, string>;
    preserveOriginalStyles?: boolean;
}

interface SkeletonProps {
    loading?: boolean;
}

interface WithSkeletonComponent {
    name: string;
    props: {
        loading?: {
            type: PropType<boolean>;
            default: boolean;
        };
        [key: string]: any;
    };
    setup: (
        props: SkeletonProps & Record<string, any>,
        context: SetupContext
    ) => () => VNode;
}

// Store for original component dimensions
const originalDimensions = new WeakMap<Component, Map<string, DOMRect>>();

/**
 * Enhanced auto-detection that works with both template and props
 */
const detectSkeletonLayout = (
    component: Component,
    
): SkeletonElement[] => {
    const template = (component as any).template || '';
    const props = (component as any).props || {};
    const layout: SkeletonElement[] = [];

    // Enhanced template analysis
    const hasImage = /img|image|imageCover|photo|avatar/i.test(template);
    const hasTitle = /h[1-6]|title|name/i.test(template);
    const hasDescription = /p>|description|content/i.test(template);
    const hasButton = /button/i.test(template);
    const hasPrice = /price|\$|\€|\£/i.test(template);
    const hasRating = /rating|star|\★/i.test(template);
    const hasBrand = /brand/i.test(template);
    const hasCategory = /category/i.test(template);
    const hasSold = /sold/i.test(template);
    const hasAvatar = /avatar/i.test(template);

    // Analyze props structure
    const propKeys = Object.keys(props);
    const hasImageProp = propKeys.some((key) =>
        /image|img|avatar|photo|pic|cover/i.test(key)
    );
    const hasTitleProp = propKeys.some((key) =>
        /title|name|heading/i.test(key)
    );
    const hasDescriptionProp = propKeys.some((key) =>
        /description|content|text|body/i.test(key)
    );
    const hasPriceProp = propKeys.some((key) => /price|cost|amount/i.test(key));
   
    const hasAvatarProp = propKeys.some((key) => /avatar/i.test(key));

    // Check for product-like structure (common e-commerce pattern)
    const isProductCard =
        (hasImage || hasImageProp) &&
        (hasTitle || hasTitleProp) &&
        (hasPrice || hasPriceProp);

    if (isProductCard) {
        // Create product card skeleton
        // Image
        layout.push({
            type: 'image',
            width: '100%',
            height: '150px',
            marginBottom: '12px',
            borderRadius: '8px',
            backgroundColor: '#e5e7eb',
        });

        // Brand
        if (hasBrand) {
            layout.push({
                type: 'badge',
                width: '60px',
                height: '14px',
                marginBottom: '8px',
                borderRadius: '4px',
                backgroundColor: '#f3f4f6',
            });
        }

        // Title
        layout.push({
            type: 'text',
            width: '90%',
            height: '20px',
            marginBottom: '8px',
            borderRadius: '4px',
        });

        // Category
        if (hasCategory) {
            layout.push({
                type: 'badge',
                width: '70px',
                height: '12px',
                marginBottom: '8px',
                borderRadius: '4px',
                backgroundColor: '#f9fafb',
            });
        }

        // Description (2-3 lines)
        if (hasDescription || hasDescriptionProp) {
            layout.push({
                type: 'text',
                width: '100%',
                height: '12px',
                marginBottom: '6px',
                borderRadius: '4px',
            });
            layout.push({
                type: 'text',
                width: '80%',
                height: '12px',
                marginBottom: '12px',
                borderRadius: '4px',
            });
        }

        // Rating and sold info
        if (hasRating || hasSold) {
            layout.push({
                type: 'rating',
                width: '120px',
                height: '14px',
                marginBottom: '12px',
                borderRadius: '4px',
                backgroundColor: '#f3f4f6',
            });
        }

        // Price and buttons row
        layout.push({
            type: 'block',
            width: '100%',
            height: '36px',
            borderRadius: '6px',
            backgroundColor: 'transparent',
            className: 'price-buttons-row',
        });
    } else if (hasAvatar || hasAvatarProp) {
        // Avatar component detection
        layout.push({
            type: 'circle',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#e5e7eb',
        });

        if (hasTitle || hasTitleProp) {
            layout.push({
                type: 'text',
                width: '120px',
                height: '16px',
                marginTop: '8px',
                marginBottom: '4px',
                borderRadius: '4px',
            });
        }

        if (hasDescription || hasDescriptionProp) {
            layout.push({
                type: 'text',
                width: '180px',
                height: '12px',
                marginBottom: '8px',
                borderRadius: '4px',
            });
        }
    } else {
        // Generic component detection
        if (hasImage || hasImageProp) {
            layout.push({
                type: 'image',
                width: '100px',
                height: '100px',
                marginBottom: '16px',
                borderRadius: '8px',
                backgroundColor: '#e5e7eb',
            });
        }

        if (hasTitle || hasTitleProp) {
            layout.push({
                type: 'text',
                width: '70%',
                height: '24px',
                marginBottom: '12px',
                borderRadius: '4px',
            });
        }

        if (hasDescription || hasDescriptionProp) {
            // Create 3 lines for paragraph content
            layout.push({
                type: 'text',
                width: '100%',
                height: '16px',
                marginBottom: '8px',
                borderRadius: '4px',
            });
            layout.push({
                type: 'text',
                width: '95%',
                height: '16px',
                marginBottom: '8px',
                borderRadius: '4px',
            });
            layout.push({
                type: 'text',
                width: '80%',
                height: '16px',
                marginBottom: '16px',
                borderRadius: '4px',
            });
        }

        if (hasButton) {
            layout.push({
                type: 'button',
                width: '120px',
                height: '36px',
                marginBottom: '8px',
                borderRadius: '6px',
                backgroundColor: '#e5e7eb',
            });
        }

        // Fallback if nothing detected
        if (layout.length === 0) {
            layout.push(
                {
                    type: 'text',
                    width: '80%',
                    height: '20px',
                    marginBottom: '12px',
                    borderRadius: '4px',
                },
                {
                    type: 'text',
                    width: '100%',
                    height: '16px',
                    marginBottom: '8px',
                    borderRadius: '4px',
                },
                {
                    type: 'text',
                    width: '90%',
                    height: '16px',
                    marginBottom: '8px',
                    borderRadius: '4px',
                },
                {
                    type: 'text',
                    width: '70%',
                    height: '16px',
                    marginBottom: '16px',
                    borderRadius: '4px',
                }
            );
        }
    }

    return layout;
};

/**
 * Creates a skeleton version of a component with automatic layout detection
 */
export function withSkeleton(
    WrappedComponent: Component,
    options: SkeletonOptions = {}
): WithSkeletonComponent {
    const {
        skeletonClass = 'skeleton-item',
        containerClass = 'skeleton-container',
        animationDuration = '1.5s',
        backgroundColor = '#e2e8f0',
        highlightColor = '#f1f5f9',
        borderRadius = '4px',
        autoDetect = true,
        customLayout,
        containerStyles = {},
        preserveOriginalStyles = true,
    } = options;

    // Generate skeleton layout
    const skeletonLayout =
        customLayout ||
        (autoDetect ? detectSkeletonLayout(WrappedComponent) : []);

    return {
        name: `WithSkeleton(${(WrappedComponent as any).name || 'Component'})`,
        props: {
            loading: {
                type: Boolean as PropType<boolean>,
                default: true, // Always loading by default
            },
            ...((WrappedComponent as any).props || {}),
        },
        setup(
            props: SkeletonProps & Record<string, any>,
            context: SetupContext
        ) {
            const isSkeletonReady = ref(false);
            const originalComponentRef = ref<HTMLElement | null>(null);
            const skeletonDimensions = ref<Map<string, DOMRect>>(new Map());

            onMounted(async () => {
                await nextTick();
                isSkeletonReady.value = true;

                if (preserveOriginalStyles && originalComponentRef.value) {
                    // Capture dimensions of the original component
                    captureOriginalDimensions(originalComponentRef.value);
                }
            });

            const captureOriginalDimensions = (element: HTMLElement) => {
                const elements = element.querySelectorAll('*');
                const dimensionsMap = new Map<string, DOMRect>();

                elements.forEach((el, index) => {
                    const rect = el.getBoundingClientRect();
                    dimensionsMap.set(`element-${index}`, rect);
                });

                // Store the main container dimensions too
                dimensionsMap.set('container', element.getBoundingClientRect());
                skeletonDimensions.value = dimensionsMap;
                originalDimensions.set(WrappedComponent, dimensionsMap);
            };

            // Get appropriate styles for each skeleton element type
            const getSkeletonStyles = (
                element: SkeletonElement,
                index: number
            ): Record<string, string> => {
                // Try to use original dimensions if available
                let width = element.width;
                let height = element.height;

                if (
                    preserveOriginalStyles &&
                    skeletonDimensions.value.size > 0
                ) {
                    const originalDim = skeletonDimensions.value.get(
                        `element-${index}`
                    );
                    if (originalDim) {
                        width = `${originalDim.width}px`;
                        height = `${originalDim.height}px`;
                    }
                }

                const baseStyle = {
                    width,
                    height,
                    marginBottom: element.marginBottom || '0',
                    marginTop: element.marginTop || '0',
                    marginLeft: element.marginLeft || '0',
                    marginRight: element.marginRight || '0',
                    borderRadius: element.borderRadius || borderRadius,
                    backgroundColor: element.backgroundColor || backgroundColor,
                    display: 'block',
                    ...(element.styles || {}),
                };

                switch (element.type) {
                    case 'image':
                        return {
                            ...baseStyle,
                            backgroundColor:
                                element.backgroundColor || '#d1d5db',
                            borderRadius: element.borderRadius || '8px',
                            display: 'block',
                        };
                    case 'button':
                        return {
                            ...baseStyle,
                            backgroundColor:
                                element.backgroundColor || '#e5e7eb',
                            borderRadius: element.borderRadius || '6px',
                            display: 'inline-block',
                        };
                    case 'input':
                        return {
                            ...baseStyle,
                            backgroundColor:
                                element.backgroundColor || '#f3f4f6',
                            border: '1px solid #d1d5db',
                            borderRadius: element.borderRadius || '6px',
                        };
                    case 'badge':
                        return {
                            ...baseStyle,
                            backgroundColor:
                                element.backgroundColor || '#f3f4f6',
                            display: 'inline-block',
                        };
                    case 'rating':
                        return {
                            ...baseStyle,
                            backgroundColor:
                                element.backgroundColor || '#f3f4f6',
                            display: 'block',
                        };
                    case 'price':
                        return {
                            ...baseStyle,
                            backgroundColor:
                                element.backgroundColor || backgroundColor,
                            display: 'inline-block',
                        };
                    case 'circle':
                        return {
                            ...baseStyle,
                            borderRadius: '50%',
                            backgroundColor:
                                element.backgroundColor || '#e5e7eb',
                            display: 'block',
                        };
                    case 'block':
                        return {
                            ...baseStyle,
                            backgroundColor: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0',
                        };
                    case 'text':
                    default:
                        return {
                            ...baseStyle,
                            backgroundColor:
                                element.backgroundColor || backgroundColor,
                        };
                }
            };

            // Special renderer for price-buttons row
            const renderPriceButtonsRow = (): VNode => {
                return h(
                    'div',
                    {
                        class: 'flex justify-between items-center',
                        style: {
                            width: '100%',
                            height: '36px',
                            marginBottom: '0',
                        },
                    },
                    [
                        // Price
                        h('div', {
                            class: skeletonClass,
                            style: {
                                width: '60px',
                                height: '24px',
                                backgroundColor: backgroundColor,
                                borderRadius: borderRadius,
                            },
                        }),
                        // Buttons group
                        h(
                            'div',
                            {
                                class: 'flex gap-1',
                            },
                            [
                                h('div', {
                                    class: skeletonClass,
                                    style: {
                                        width: '45px',
                                        height: '28px',
                                        backgroundColor: '#e5e7eb',
                                        borderRadius: '14px',
                                    },
                                }),
                                h('div', {
                                    class: skeletonClass,
                                    style: {
                                        width: '55px',
                                        height: '28px',
                                        backgroundColor: '#e5e7eb',
                                        borderRadius: '14px',
                                    },
                                }),
                            ]
                        ),
                    ]
                );
            };

            // Render image skeleton with proper placeholder
            const renderImageSkeleton = (
                element: SkeletonElement,
                index: number
            ): VNode => {
                const style = getSkeletonStyles(element, index);
                return h(
                    'div',
                    {
                        key: `skeleton-${index}`,
                        class: `${skeletonClass} image-skeleton`,
                        style: {
                            ...style,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                        },
                    },
                    [
                        // Image icon placeholder
                        h(
                            'div',
                            {
                                style: {
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: '#9ca3af',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: '0.6',
                                },
                            },
                            [
                                h(
                                    'svg',
                                    {
                                        width: '24',
                                        height: '24',
                                        viewBox: '0 0 24 24',
                                        fill: 'currentColor',
                                        style: { color: '#ffffff' },
                                    },
                                    [
                                        h('path', {
                                            d: 'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z',
                                        }),
                                    ]
                                ),
                            ]
                        ),
                    ]
                );
            };

            // Render skeleton elements
            const renderSkeletonElements = (): VNode[] => {
                return skeletonLayout.map(
                    (element: SkeletonElement, index: number) => {
                        if (element.className === 'price-buttons-row') {
                            return renderPriceButtonsRow();
                        }

                        if (element.type === 'image') {
                            return renderImageSkeleton(element, index);
                        }

                        const style = getSkeletonStyles(element, index);

                        return h('div', {
                            key: `skeleton-${index}`,
                            class: `${skeletonClass} ${
                                element.className || ''
                            }`,
                            style,
                        });
                    }
                );
            };

            // Render skeleton container
            const renderSkeleton = (): VNode => {
                const defaultContainerStyles = {
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '16px',
                    backgroundColor: '#ffffff',
                    width: '100%',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    position: 'relative',
                    maxWidth: '100%',
                    height: 'fit-content',
                };

                // Use original container dimensions if available
                let containerWidth = '100%';
                let containerHeight = 'fit-content';

                if (
                    preserveOriginalStyles &&
                    skeletonDimensions.value.has('container')
                ) {
                    const containerDim = skeletonDimensions.value.get(
                        'container'
                    ) as DOMRect;
                    containerWidth = `${containerDim.width}px`;
                    containerHeight = `${containerDim.height}px`;
                }

                return h(
                    'div',
                    {
                        class: containerClass,
                        style: {
                            ...defaultContainerStyles,
                            ...containerStyles,
                            width: containerWidth,
                            height: containerHeight,
                        },
                    },
                    [
                        // Like button placeholder (top-right)
                        h('div', {
                            class: skeletonClass,
                            style: {
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: '#f3f4f6',
                                zIndex: '10',
                            },
                        }),
                        // Main content
                        ...(isSkeletonReady.value
                            ? renderSkeletonElements()
                            : []),
                    ]
                );
            };

            // Add skeleton styles to document
            const addSkeletonStyles = (): void => {
                if (typeof document !== 'undefined') {
                    const styleId = 'vue-skeleton-styles';
                    if (!document.getElementById(styleId)) {
                        const style = document.createElement('style');
                        style.id = styleId;
                        style.textContent = `
                            @keyframes skeleton-shimmer {
                                0% {
                                    background-position: -468px 0;
                                }
                                100% {
                                    background-position: 468px 0;
                                }
                            }
                            
                            .${skeletonClass} {
                                background: linear-gradient(90deg, ${backgroundColor} 25%, ${highlightColor} 50%, ${backgroundColor} 75%);
                                background-size: 400% 100%;
                                animation: skeleton-shimmer ${animationDuration} infinite ease-in-out;
                            }
                            
                            .${skeletonClass}.image-skeleton {
                                background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
                                background-size: 400% 100%;
                                animation: skeleton-shimmer ${animationDuration} infinite ease-in-out;
                            }
                            
                            .${containerClass} {
                                user-select: none;
                                pointer-events: none;
                            }
                        `;
                        document.head.appendChild(style);
                    }
                }
            };

            return (): VNode => {
                addSkeletonStyles();

                // Always show skeleton (since loading defaults to true)
                if (props.loading !== false) {
                    return renderSkeleton();
                }

                // Render original component when loading is explicitly set to false
                return h(
                    'div',
                    {
                        ref: (el) => {
                            if (el)
                                originalComponentRef.value = el as HTMLElement;
                        },
                    },
                    [
                        h(
                            WrappedComponent,
                            {
                                ...props,
                            },
                            context.slots
                        ),
                    ]
                );
            };
        },
    };
}

// Predefined skeleton for product cards
export const createProductCardSkeleton = (
    options: SkeletonOptions = {}
): SkeletonOptions => {
    return {
        ...options,
        customLayout: [
            {
                type: 'image',
                width: '100%',
                height: '150px',
                marginBottom: '12px',
                borderRadius: '8px',
                backgroundColor: '#e5e7eb',
            },
            {
                type: 'badge',
                width: '60px',
                height: '14px',
                marginBottom: '8px',
                borderRadius: '4px',
                backgroundColor: '#f3f4f6',
            },
            {
                type: 'text',
                width: '90%',
                height: '18px',
                marginBottom: '8px',
                borderRadius: '4px',
            },
            {
                type: 'badge',
                width: '70px',
                height: '12px',
                marginBottom: '8px',
                borderRadius: '4px',
                backgroundColor: '#f9fafb',
            },
            {
                type: 'text',
                width: '100%',
                height: '12px',
                marginBottom: '6px',
                borderRadius: '4px',
            },
            {
                type: 'text',
                width: '80%',
                height: '12px',
                marginBottom: '12px',
                borderRadius: '4px',
            },
            {
                type: 'rating',
                width: '120px',
                height: '14px',
                marginBottom: '12px',
                borderRadius: '4px',
                backgroundColor: '#f3f4f6',
            },
            {
                type: 'block',
                width: '100%',
                height: '36px',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                className: 'price-buttons-row',
            },
        ],
        autoDetect: false,
        containerStyles: {
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            maxWidth: '100%',
            height: 'fit-content',
            position: 'relative',
            overflow: 'hidden',
        },
    };
};

// Predefined skeleton for avatar components
export const createAvatarSkeleton = (
    options: SkeletonOptions = {}
): SkeletonOptions => {
    return {
        ...options,
        customLayout: [
            {
                type: 'circle',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#e5e7eb',
            },
            {
                type: 'text',
                width: '120px',
                height: '16px',
                marginTop: '8px',
                marginBottom: '4px',
                borderRadius: '4px',
            },
            {
                type: 'text',
                width: '180px',
                height: '12px',
                marginBottom: '8px',
                borderRadius: '4px',
            },
        ],
        autoDetect: false,
        containerStyles: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
        },
    };
};

// Helper function specifically for product cards
export function withProductCardSkeleton(
    WrappedComponent: Component,
    options: SkeletonOptions = {}
): WithSkeletonComponent {
    return withSkeleton(WrappedComponent, createProductCardSkeleton(options));
}

// Helper function specifically for avatar components
export function withAvatarSkeleton(
    WrappedComponent: Component,
    options: SkeletonOptions = {}
): WithSkeletonComponent {
    return withSkeleton(WrappedComponent, createAvatarSkeleton(options));
}

// Type exports
export type {
    SkeletonElement,
    SkeletonOptions,
    SkeletonProps,
    WithSkeletonComponent,
};
