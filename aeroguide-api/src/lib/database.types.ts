export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          picture: string | null;
          google_id: string | null;
          role: 'user' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          picture?: string | null;
          google_id?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          picture?: string | null;
          google_id?: string | null;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      schools: {
        Row: {
          id: string;
          name: string;
          location: string;
          full_address: string | null;
          rating: number;
          reviews_count: number;
          image_url: string;
          pricing: string;
          students: number;
          duration: string;
          certifications: string[];
          phone: string | null;
          email: string | null;
          website: string | null;
          established: number | null;
          fleet_size: number | null;
          instructors: number | null;
          description: string | null;
          features: string[];
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          location: string;
          full_address?: string | null;
          rating?: number;
          reviews_count?: number;
          image_url: string;
          pricing: string;
          students?: number;
          duration: string;
          certifications?: string[];
          phone?: string | null;
          email?: string | null;
          website?: string | null;
          established?: number | null;
          fleet_size?: number | null;
          instructors?: number | null;
          description?: string | null;
          features?: string[];
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          location?: string;
          full_address?: string | null;
          rating?: number;
          reviews_count?: number;
          image_url?: string;
          pricing?: string;
          students?: number;
          duration?: string;
          certifications?: string[];
          phone?: string | null;
          email?: string | null;
          website?: string | null;
          established?: number | null;
          fleet_size?: number | null;
          instructors?: number | null;
          description?: string | null;
          features?: string[];
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      training_programs: {
        Row: {
          id: string;
          school_id: string;
          name: string;
          description: string;
          duration: string;
          price: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          name: string;
          description: string;
          duration: string;
          price: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          name?: string;
          description?: string;
          duration?: string;
          price?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "training_programs_school_id_fkey";
            columns: ["school_id"];
            isOneToOne: false;
            referencedRelation: "schools";
            referencedColumns: ["id"];
          }
        ];
      };
      reviews: {
        Row: {
          id: string;
          school_id: string;
          user_id: string;
          rating: number;
          text: string;
          course: string;
          status: 'pending' | 'approved' | 'rejected';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          user_id: string;
          rating: number;
          text: string;
          course: string;
          status?: 'pending' | 'approved' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          user_id?: string;
          rating?: number;
          text?: string;
          course?: string;
          status?: 'pending' | 'approved' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_school_id_fkey";
            columns: ["school_id"];
            isOneToOne: false;
            referencedRelation: "schools";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reviews_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      inquiries: {
        Row: {
          id: string;
          school_id: string;
          user_id: string | null;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          inquiry_type: 'general' | 'discovery_flight' | 'enrollment' | 'brochure';
          status: 'pending' | 'contacted' | 'closed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          user_id?: string | null;
          name: string;
          email: string;
          phone?: string | null;
          message: string;
          inquiry_type?: 'general' | 'discovery_flight' | 'enrollment' | 'brochure';
          status?: 'pending' | 'contacted' | 'closed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          school_id?: string;
          user_id?: string | null;
          name?: string;
          email?: string;
          phone?: string | null;
          message?: string;
          inquiry_type?: 'general' | 'discovery_flight' | 'enrollment' | 'brochure';
          status?: 'pending' | 'contacted' | 'closed';
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inquiries_school_id_fkey";
            columns: ["school_id"];
            isOneToOne: false;
            referencedRelation: "schools";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inquiries_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      contact_messages: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          status: 'new' | 'read' | 'replied';
          created_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          subject: string;
          message: string;
          status?: 'new' | 'read' | 'replied';
          created_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          subject?: string;
          message?: string;
          status?: 'new' | 'read' | 'replied';
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      user_role: 'user' | 'admin';
      review_status: 'pending' | 'approved' | 'rejected';
      inquiry_type: 'general' | 'discovery_flight' | 'enrollment' | 'brochure';
      inquiry_status: 'pending' | 'contacted' | 'closed';
      message_status: 'new' | 'read' | 'replied';
    };
  };
}

// Helper types for API responses
export type User = Database['public']['Tables']['users']['Row'];
export type School = Database['public']['Tables']['schools']['Row'];
export type TrainingProgram = Database['public']['Tables']['training_programs']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type Inquiry = Database['public']['Tables']['inquiries']['Row'];
export type ContactMessage = Database['public']['Tables']['contact_messages']['Row'];

// Extended types with relations
export interface SchoolWithPrograms extends School {
  training_programs: TrainingProgram[];
}

export interface SchoolWithReviews extends School {
  reviews: (Review & { user: Pick<User, 'name' | 'picture'> })[];
}

export interface SchoolFull extends School {
  training_programs: TrainingProgram[];
  reviews: (Review & { user: Pick<User, 'name' | 'picture'> })[];
}

export interface ReviewWithUser extends Review {
  user: Pick<User, 'name' | 'picture'>;
}
