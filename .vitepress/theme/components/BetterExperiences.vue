<template>
    <div class="experiences">
        <div v-for="(experience, idx) in experiences" :key="idx" class="experience">
            <ExperienceItem :publication="experience" />
            <img :src="experience.icon" alt="Experience image" class="experience-icon" />
            <div class="experience-content">
                <h2 class="experience-company">{{ experience.company }}</h2>
                <div class="experience-title">
                    <div v-html="highlight(experience.title)"></div>
                    <div class="experience-date">
                        <span>{{ experience.start }}</span>
                        <span v-if="experience.end"> - {{ experience.end }}</span>
                        <span v-else> - Present</span>
                    </div>
                </div>
                <div class="experience-links">
                    <a v-for="(link, idx) in experience.links" :key="idx" :href="link.url" target="_blank"
                        rel="noopener">
                        [{{ link.label }}]
                    </a>
                </div>
                <div class="experience-details">{{ experience.details }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Experience } from '../../type'

defineProps<{
    experiences: Experience[]
}>()

function highlight(inner: string): string {
    return inner.replace(/\=\=(.*?)\=\=/g, '<span class="highlight">$1</span>');
}
</script>

<style lang="css" scoped>
.experience {
    display: flex;
    margin-bottom: 2rem;
    align-items: flex-start;
}

.experience-icon {
    margin-top: 0.22em;
    margin-right: 15px;
    width: 75px;
    object-fit: cover;
    border-radius: 8px;
}

@media (max-width: 768px) {
    .experience-icon {
        width: 60px;
    }
}

.experience-content {
    flex: 1;
}

.experience-company {
    border: none;
    margin: 0 !important;
    padding: 0 !important;
    font-size: 1.2rem;
    line-height: 1.35rem;
    font-weight: bold;
}

@media (max-width: 768px) {
    .experience-company {
        font-size: 1.1rem;
    }
}

.experience-title {
    color: #888;
    margin-top: 0.4rem;
    line-height: 1rem;
    display: flex;
    justify-content: space-between;
}

.experience-date {
    font-style: italic;
}

.experience-links {
    margin-top: 0.5rem;
    line-height: 1rem;
}

.experience-links a {
    margin-right: 0.5rem;
    font-size: 0.95rem;
    color: #2e80f2;
}

.experience-links a:hover {
    color: #0040af;
}

.experience-details {
    font-size: 0.95rem;
    margin-top: 0.4rem;
    line-height: 1.2rem;
}
</style>

<style>
.experience-title .highlight {
    font-weight: bold;
    color: #ff82b2;
    font-style: italic;
}
</style>