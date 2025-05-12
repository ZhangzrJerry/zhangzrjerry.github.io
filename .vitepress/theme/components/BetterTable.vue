<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

interface PostData {
    time: string;
    type: string;
    title: string;
    detail: string;
    tags: string[];
    url: string;
}

const props = defineProps<{
    data: PostData[]
}>();

// Get all unique tags from data
const allTags = computed(() => {
    const tags = new Set<string>();
    props.data.forEach(post => {
        post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort((a, b) => a.localeCompare(b));
});

// Get all unique years and months from data
const allYears = computed(() => {
    const years = new Set<string>();
    props.data.forEach(post => {
        const year = new Date(post.time).getFullYear().toString();
        years.add(year);
    });
    return Array.from(years).sort((a, b) => Number(b) - Number(a));
});

const allTypes = computed(() => {
    const types = new Set<string>();
    props.data.forEach(post => {
        types.add(post.type);
    });
    return Array.from(types).sort((a, b) => a.localeCompare(b));
});

const allMonths = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
];

// Filter states
const selectedYear = ref<string[]>([]);
const selectedMonth = ref<string[]>([]);
const selectedTags = ref<string[]>([]);
const selectedType = ref<string[]>([]);
const sortByTime = ref<boolean>(true);

// Update URL when filters change
const updateUrl = () => {
    const params = new URLSearchParams();
    if (selectedYear.value.length > 0) params.set('year', selectedYear.value.join(','));
    if (selectedMonth.value.length > 0) params.set('month', selectedMonth.value.join(','));
    if (selectedTags.value.length > 0) params.set('tags', selectedTags.value.join(','));
    if (selectedType.value.length > 0) params.set('type', selectedType.value.join(','));

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({}, '', newUrl);
};

// Initialize filters from URL
onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    selectedYear.value = params.get('year')?.split(',') || [];
    selectedMonth.value = params.get('month')?.split(',') || [];
    selectedTags.value = params.get('tags')?.split(',') || [];
    selectedType.value = params.get('type')?.split(',') || [];
});

// Sort and filter data
const filteredData = computed(() => {
    return props.data
        .filter(post => {
            const postDate = new Date(post.time);
            const postYear = postDate.getFullYear().toString();
            const postMonth = (postDate.getMonth() + 1).toString().padStart(2, '0');
            if (selectedYear.value.length > 0 && !selectedYear.value.includes(postYear)) return false;
            if (selectedMonth.value.length > 0 && !selectedMonth.value.includes(postMonth)) return false;
            if (selectedTags.value.length > 0) {
                // every tag in selectedTags should be in post.tags
                if (!selectedTags.value.every(tag => post.tags.includes(tag))) return false;
            }
            if (selectedType.value.length > 0) {
                if (!selectedType.value.some(type => post.type === type)) return false;
            }
            return true;
        })
        .sort((a, b) => {
            if (sortByTime.value) {
                return new Date(b.time).getTime() - new Date(a.time).getTime();
            } else {
                return a.title.localeCompare(b.title);
            }
        });
});

const handleType = (type: string) => {
    switch (type) {
        case 'project':
            return '📦';
        case 'lecture':
            return '🏫';
        case 'thesis':
            return '📚';
        case 'notes':
            return '🧭';
        default:
            return '🎯';
    }
}

const handleTags = (tags: string[]) => {
    let priorityTag = <string[]>[]
    let otherTag = <string[]>[]
    for (let tag of tags) {
        if (selectedTags.value.includes(tag)) {
            priorityTag.push(tag)
        } else {
            otherTag.push(tag)
        }
    }
    return priorityTag.map(tag => `<img src="/tags/${tag}.svg" class="tag-icon" alt="${tag}" />`).join('') + otherTag.map(tag => `<img src="/tags/${tag}.svg" class="tag-icon" alt="${tag}" />`).join('')
}

</script>

<template>
    <table class="filter-table">
        <thead>
            <tr>
                <th @click="selectedYear = []; updateUrl()">Year</th>
                <th @click="selectedMonth = []; updateUrl()">Month</th>
                <th @click="selectedType = []; updateUrl()">Type</th>
                <th @click="selectedTags = []; updateUrl()">Tags</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>

                    <select v-model="selectedYear" @click="updateUrl" multiple>
                        <option v-for="year in allYears" :key="year" :value="year">{{ year }}
                        </option>
                    </select>
                </td>
                <td>
                    <select v-model="selectedMonth" @click="updateUrl" multiple>
                        <option v-for="month in allMonths" :key="month.value" :value="month.value">
                            {{ month.label }}
                        </option>
                    </select>
                </td>
                <td>
                    <select v-model="selectedType" @click="updateUrl" multiple>
                        <option v-for="type in allTypes" :key="type" :value="type">{{ type }}
                        </option>
                    </select>
                </td>
                <td>
                    <select v-model="selectedTags" @click="updateUrl" multiple>
                        <option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}
                        </option>
                    </select>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="post-table" :class="{ 'deactive': filteredData.length === 0 }">
        <thead>
            <tr class="post-header">
                <th class="post-time" @click="sortByTime = true" :class="{ 'active': sortByTime }">
                    Time
                </th>
                <th class="post-type">Type</th>
                <th class="post-title" @click="sortByTime = false" :class="{ 'active': !sortByTime }">Posts</th>
                <th class="post-tags">
                    Tags
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="post in filteredData" :key="post.title">
                <td class="post-time">{{ post.time }}</td>
                <td class="post-type">{{ handleType(post.type) }}</td>
                <td>
                    <a :href="post.url">
                        <div class="post-title">{{ post.title }}</div>
                    </a>
                    <div class="post-detail">{{ post.detail }}</div>
                    <div class="mobile-notes">
                        <div class="mobile-post-tags" v-html="handleTags(post.tags)"></div>
                        <div class="mobile-post-time">{{ post.time }}</div>
                    </div>
                </td>
                <td class="post-tags">
                    <div v-html="handleTags(post.tags)"></div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
}

.post-table.deactive {
    display: none;
}

th,
td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
}

.post-time,
.post-type,
.post-tags {
    text-align: center;
}

.post-header>.post-time,
.post-header>.post-title {
    cursor: pointer;
}

.post-title {
    font-weight: 600;
}

.post-time.active,
.post-title.active {
    color: var(--vp-c-text-title);
    font-weight: 700;
}

.post-detail {
    font-size: 0.875rem;
    color: #666;
}

.post-tags>div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    flex-wrap: wrap;
    min-height: 1.5rem;
}

.mobile-notes {
    margin-top: 0.3rem;
    display: flex;
    justify-content: space-between;
}

.mobile-post-tags {
    display: flex;
    flex-wrap: wrap;
    height: 1rem;
    gap: 0.35rem;
}


.mobile-post-time {
    line-height: 1.2rem;
    margin-left: auto;
    font-style: italic;
}

.filter-controls {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

select {
    padding: 0.25rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background-color: white;
    font-size: 0.875rem;
}

th {
    position: relative;
}

.filter-table th {
    text-align: center;
    padding: 0.25rem;
    line-height: 1.2rem;
    width: 10%;
    cursor: pointer;
}


.filter-table td {
    padding: 0rem;
    align-items: center;
    width: 10%;
    border: none;
    border-radius: 0;
}

.filter-table select {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    background-color: var(--vp-c-bg-soft);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: none;
    scrollbar-width: none;
}

.filter-table select::-webkit-scrollbar {
    display: none;
}

@media (max-width: 768px) {

    .post-header,
    .post-time,
    .post-type,
    .post-tags {
        display: none;
    }

    .post-title {
        font-size: 0.925rem;
    }
}

@media (min-width: 768px) {

    .mobile-post-tags,
    .mobile-post-time,
    .mobile-notes {
        display: none;
    }
}
</style>